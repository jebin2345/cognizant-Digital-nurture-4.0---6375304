-- Clean up existing tables (if any)
BEGIN
   EXECUTE IMMEDIATE 'DROP TABLE Transactions';
   EXECUTE IMMEDIATE 'DROP TABLE Loans';
   EXECUTE IMMEDIATE 'DROP TABLE Accounts';
   EXECUTE IMMEDIATE 'DROP TABLE Employees';
   EXECUTE IMMEDIATE 'DROP TABLE Customers';
EXCEPTION
   WHEN OTHERS THEN
      IF SQLCODE != -942 THEN
         RAISE;
      END IF;
END;
/

-- Create Customers table
CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    DOB DATE,
    Balance NUMBER,
    LastModified DATE
);

-- Create Accounts table
CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    AccountType VARCHAR2(20),
    Balance NUMBER,
    LastModified DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Create Transactions table
CREATE TABLE Transactions (
    TransactionID NUMBER PRIMARY KEY,
    AccountID NUMBER,
    TransactionDate DATE,
    Amount NUMBER,
    TransactionType VARCHAR2(10),
    FOREIGN KEY (AccountID) REFERENCES Accounts(AccountID)
);

-- Create Loans table
CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    LoanAmount NUMBER,
    InterestRate NUMBER,
    StartDate DATE,
    EndDate DATE,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- Create Employees table
CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    Name VARCHAR2(100),
    Position VARCHAR2(50),
    Salary NUMBER,
    Department VARCHAR2(50),
    HireDate DATE
);

-- Insert sample data
INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified)
VALUES (1, 'John Doe', TO_DATE('1985-05-15', 'YYYY-MM-DD'), 1000, SYSDATE);

INSERT INTO Customers (CustomerID, Name, DOB, Balance, LastModified)
VALUES (2, 'Jane Smith', TO_DATE('1990-07-20', 'YYYY-MM-DD'), 1500, SYSDATE);

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
VALUES (1, 1, 'Savings', 1000, SYSDATE);

INSERT INTO Accounts (AccountID, CustomerID, AccountType, Balance, LastModified)
VALUES (2, 2, 'Checking', 1500, SYSDATE);

INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
VALUES (1, 1, SYSDATE, 200, 'Deposit');

INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
VALUES (2, 2, SYSDATE, 300, 'Withdrawal');

INSERT INTO Loans (LoanID, CustomerID, LoanAmount, InterestRate, StartDate, EndDate)
VALUES (1, 1, 5000, 5, SYSDATE, ADD_MONTHS(SYSDATE, 60));

INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
VALUES (1, 'Alice Johnson', 'Manager', 70000, 'HR', TO_DATE('2015-06-15', 'YYYY-MM-DD'));

INSERT INTO Employees (EmployeeID, Name, Position, Salary, Department, HireDate)
VALUES (2, 'Bob Brown', 'Developer', 60000, 'IT', TO_DATE('2017-03-20', 'YYYY-MM-DD'));

COMMIT;
-- First create the sequence if it doesn't exist
BEGIN
  EXECUTE IMMEDIATE 'CREATE SEQUENCE TransactionID_seq 
                     START WITH 1000 
                     INCREMENT BY 1 
                     NOCACHE 
                     NOCYCLE';
  DBMS_OUTPUT.PUT_LINE('Transaction sequence created successfully');
EXCEPTION
  WHEN OTHERS THEN
    IF SQLCODE = -955 THEN -- sequence already exists
      DBMS_OUTPUT.PUT_LINE('Transaction sequence already exists');
    ELSE
      DBMS_OUTPUT.PUT_LINE('Error creating sequence: ' || SQLERRM);
      RAISE;
    END IF;
END;
/

-- Now create the procedure
CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest AS
    v_interest_rate NUMBER := 1; -- 1% monthly interest
    v_updated_count NUMBER := 0;
    v_next_trans_id NUMBER;
BEGIN
    DBMS_OUTPUT.PUT_LINE('Starting monthly interest processing...');
    DBMS_OUTPUT.PUT_LINE('--------------------------------------');
    
    -- Get the next transaction ID at the start
    SELECT TransactionID_seq.NEXTVAL INTO v_next_trans_id FROM dual;
    
    -- Update all savings accounts with interest
    FOR savings_rec IN (
        SELECT AccountID, Balance 
        FROM Accounts 
        WHERE AccountType = 'Savings'
        FOR UPDATE
    ) LOOP
        -- Calculate and apply interest
        UPDATE Accounts
        SET Balance = Balance * (1 + (v_interest_rate/100))
        WHERE AccountID = savings_rec.AccountID;
        
        -- Record the interest transaction
        INSERT INTO Transactions (TransactionID, AccountID, TransactionDate, Amount, TransactionType)
        VALUES (
            v_next_trans_id,
            savings_rec.AccountID,
            SYSDATE,
            savings_rec.Balance * (v_interest_rate/100),
            'Interest'
        );
        
        -- Get next transaction ID for next iteration
        SELECT TransactionID_seq.NEXTVAL INTO v_next_trans_id FROM dual;
        
        v_updated_count := v_updated_count + 1;
        DBMS_OUTPUT.PUT_LINE('Applied interest to account ' || savings_rec.AccountID || 
                            ', New balance: ' || (savings_rec.Balance * (1 + (v_interest_rate/100))));
    END LOOP;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('--------------------------------------');
    DBMS_OUTPUT.PUT_LINE('Monthly interest processing completed.');
    DBMS_OUTPUT.PUT_LINE('Accounts updated: ' || v_updated_count);
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        DBMS_OUTPUT.PUT_LINE('Error processing monthly interest: ' || SQLERRM);
        RAISE;
END ProcessMonthlyInterest;
/
CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_bonus_percentage IN NUMBER
) AS
    v_updated_count NUMBER := 0;
BEGIN
    IF p_bonus_percentage <= 0 THEN
        RAISE_APPLICATION_ERROR(-20001, 'Bonus percentage must be positive');
    END IF;
    
    FOR emp_rec IN (
        SELECT EmployeeID, Salary 
        FROM Employees 
        WHERE Department = p_department
        FOR UPDATE
    ) LOOP
        UPDATE Employees
        SET Salary = Salary * (1 + (p_bonus_percentage/100))
        WHERE EmployeeID = emp_rec.EmployeeID;
        
        v_updated_count := v_updated_count + 1;
    END LOOP;
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Updated bonuses for ' || v_updated_count || ' employees');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
CREATE OR REPLACE PROCEDURE TransferFunds(
    p_from_account IN NUMBER,
    p_to_account IN NUMBER,
    p_amount IN NUMBER
) AS
    v_from_balance NUMBER;
    v_transaction_id NUMBER;
BEGIN
    -- Validate amount
    IF p_amount <= 0 THEN
        RAISE_APPLICATION_ERROR(-20002, 'Amount must be positive');
    END IF;
    
    -- Check source account
    BEGIN
        SELECT Balance INTO v_from_balance
        FROM Accounts
        WHERE AccountID = p_from_account
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20003, 'Source account not found');
    END;
    
    -- Check destination account
    BEGIN
        SELECT 1 INTO v_from_balance
        FROM Accounts
        WHERE AccountID = p_to_account
        FOR UPDATE;
    EXCEPTION
        WHEN NO_DATA_FOUND THEN
            RAISE_APPLICATION_ERROR(-20004, 'Destination account not found');
    END;
    
    -- Check balance
    IF v_from_balance < p_amount THEN
        RAISE_APPLICATION_ERROR(-20005, 'Insufficient funds');
    END IF;
    
    -- Get transaction ID
    SELECT TransactionID_seq.NEXTVAL INTO v_transaction_id FROM dual;
    
    -- Perform transfer
    UPDATE Accounts SET Balance = Balance - p_amount WHERE AccountID = p_from_account;
    UPDATE Accounts SET Balance = Balance + p_amount WHERE AccountID = p_to_account;
    
    -- Record transactions
    INSERT INTO Transactions VALUES (v_transaction_id, p_from_account, SYSDATE, p_amount, 'Transfer-Out');
    INSERT INTO Transactions VALUES (TransactionID_seq.NEXTVAL, p_to_account, SYSDATE, p_amount, 'Transfer-In');
    
    COMMIT;
    DBMS_OUTPUT.PUT_LINE('Transfer completed successfully');
EXCEPTION
    WHEN OTHERS THEN
        ROLLBACK;
        RAISE;
END;
/
