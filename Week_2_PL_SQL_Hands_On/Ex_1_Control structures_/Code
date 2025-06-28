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

-- Add IsVIP column if not exists (for Scenario 2)
BEGIN
  EXECUTE IMMEDIATE 'ALTER TABLE Customers ADD IsVIP VARCHAR2(5) DEFAULT ''FALSE''';
EXCEPTION
  WHEN OTHERS THEN NULL; -- Ignore if column already exists
END;
/

-- Scenario 1: Apply 1% discount to customers over 60
DECLARE
  v_discount_rate NUMBER := 1; -- 1% discount
  v_customer_age NUMBER;
BEGIN
  DBMS_OUTPUT.PUT_LINE('Applying senior citizen discounts...');
  DBMS_OUTPUT.PUT_LINE('----------------------------------');
  
  FOR customer_rec IN (
    SELECT c.CustomerID, c.Name, c.DOB, l.LoanID, l.InterestRate
    FROM Customers c
    JOIN Loans l ON c.CustomerID = l.CustomerID
  ) LOOP
    -- Calculate age in years
    v_customer_age := FLOOR(MONTHS_BETWEEN(SYSDATE, customer_rec.DOB)/12);
    
    IF v_customer_age > 60 THEN
      -- Apply discount (without LastModified as it doesn't exist in Loans)
      UPDATE Loans
      SET InterestRate = InterestRate - v_discount_rate
      WHERE LoanID = customer_rec.LoanID;
      
      DBMS_OUTPUT.PUT_LINE('Applied 1% discount to ' || customer_rec.Name || 
                          ' (Age: ' || v_customer_age || 
                          '), New Rate: ' || (customer_rec.InterestRate - v_discount_rate) || '%');
    END IF;
  END LOOP;
  
  COMMIT;
  DBMS_OUTPUT.PUT_LINE('----------------------------------');
  DBMS_OUTPUT.PUT_LINE('Discount application completed.');
END;
/
BEGIN
  EXECUTE IMMEDIATE 'ALTER TABLE Customers ADD IsVIP VARCHAR2(5) DEFAULT ''FALSE''';
  DBMS_OUTPUT.PUT_LINE('Added IsVIP column to Customers table');
EXCEPTION
  WHEN OTHERS THEN 
    IF SQLCODE = -1430 THEN
      DBMS_OUTPUT.PUT_LINE('IsVIP column already exists');
    ELSE
      RAISE;
    END IF;
END;
/


DECLARE
  v_vip_threshold NUMBER := 10000; 
  v_vip_count NUMBER := 0;
BEGIN
  DBMS_OUTPUT.PUT_LINE('Processing VIP promotions...');
  DBMS_OUTPUT.PUT_LINE('---------------------------');
  
  FOR customer_rec IN (SELECT CustomerID, Name, Balance FROM Customers) LOOP
    IF customer_rec.Balance > v_vip_threshold THEN
      -- Update VIP status (using LastModified only if it exists in Customers)
      UPDATE Customers
      SET IsVIP = 'TRUE'
      WHERE CustomerID = customer_rec.CustomerID;
      
      v_vip_count := v_vip_count + 1;
      DBMS_OUTPUT.PUT_LINE('Promoted ' || customer_rec.Name || 
                          ' to VIP (Balance: $' || customer_rec.Balance || ')');
    END IF;
  END LOOP;
  
  COMMIT;
  DBMS_OUTPUT.PUT_LINE('---------------------------');
  DBMS_OUTPUT.PUT_LINE('VIP promotions completed. Total VIPs: ' || v_vip_count);
END;
/

DECLARE
  v_reminder_days NUMBER := 30;
  v_due_date DATE;
  v_days_remaining NUMBER;
BEGIN
  DBMS_OUTPUT.PUT_LINE('Sending loan due reminders...');
  DBMS_OUTPUT.PUT_LINE('----------------------------');
  
  FOR loan_rec IN (
    SELECT l.LoanID, c.CustomerID, c.Name, l.LoanAmount, l.EndDate
    FROM Loans l
    JOIN Customers c ON l.CustomerID = c.CustomerID
    WHERE l.EndDate BETWEEN SYSDATE AND SYSDATE + v_reminder_days
    ORDER BY l.EndDate
  ) LOOP
    v_due_date := loan_rec.EndDate;
    v_days_remaining := v_due_date - TRUNC(SYSDATE);
    
    DBMS_OUTPUT.PUT_LINE('REMINDER: Customer ' || loan_rec.Name || 
                        ' (ID: ' || loan_rec.CustomerID || ')');
    DBMS_OUTPUT.PUT_LINE('Loan Amount: $' || loan_rec.LoanAmount);
    DBMS_OUTPUT.PUT_LINE('Due Date: ' || TO_CHAR(v_due_date, 'DD-MON-YYYY') || 
                        ' (in ' || v_days_remaining || ' days)');
    DBMS_OUTPUT.PUT_LINE('----------------------------');
  END LOOP;
  
  DBMS_OUTPUT.PUT_LINE('Reminder process completed.');
END;
/
