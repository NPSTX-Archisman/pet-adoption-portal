INSERT INTO users (
    email,
    full_name,
    password_hash,
    role
)
VALUES (
           'admin.one@petstore.com',
           'Admin One',
           '$2a$10$7vekC6K2mDMHOVSKRVeAkeL5kFp1/iwGRMELrWeWzIZhOb4PmlSFG',
           'ADMIN'
       ),
    (
    'admin.two@petstore.com',
    'Admin Two',
    '$2a$10$7vekC6K2mDMHOVSKRVeAkeL5kFp1/iwGRMELrWeWzIZhOb4PmlSFG',
    'ADMIN'
    );