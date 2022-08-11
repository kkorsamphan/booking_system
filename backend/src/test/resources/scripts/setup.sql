INSERT INTO user_account (user_id, email, first_name, last_name, "password") VALUES
    ('bbaabb3e-b07d-4c55-86a1-53145997e945', 'abc@def.com', 'firstName', 'lastName', 'password');
INSERT INTO room (room_id, "size") VALUES
    ('56680e1c-02ad-4210-8dfd-6b3effcbd7c7', 5);
INSERT INTO booking (booking_id, end_time, start_time, room_id, user_id) VALUES
    ('0bb4cd49-78cf-4824-8f79-9111e01a026a', '2022-08-08 21:00:00.000', '2022-08-08 20:00:00.000', '56680e1c-02ad-4210-8dfd-6b3effcbd7c7', 'bbaabb3e-b07d-4c55-86a1-53145997e945');