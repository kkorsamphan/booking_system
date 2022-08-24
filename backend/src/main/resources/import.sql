INSERT INTO room (room_id, name, "size") VALUES ('56680e1c-02ad-4210-8dfd-6b3effcbd7c7', 'A001', 15);
INSERT INTO room (room_id, name, "size") VALUES ('0bb4cd49-78cf-4824-8f79-9111e01a026a', 'A002', 15);
INSERT INTO room (room_id, name, "size") VALUES ('d1f1b09f-b73a-4427-93b5-3ee18c080441', 'A003', 15);
INSERT INTO room (room_id, name, "size") VALUES ('91f549fc-4188-4f19-bca0-f4e2b8fbab0c', 'A004', 20);
INSERT INTO room (room_id, name, "size") VALUES ('ff9af9d4-9633-4e6d-b39f-3b3f63c1b85e', 'A005', 20);
INSERT INTO room (room_id, name, "size") VALUES ('31a75bad-e1f3-42dd-9a23-79db8fc8ad96', 'A006', 20);
INSERT INTO user_account (user_id, email, first_name, last_name, "password") VALUES ('bbaabb3e-b07d-4c55-86a1-53145997e945', 'xxx+user1@example.com', 'User 1', 'Test', 'Pa$$word');
INSERT INTO booking (booking_id, booking_number, end_time, start_time, status, room_id, user_id) VALUES ('ca7f76e6-99e6-49b0-8cba-07ce84546988', 'BA00001', '2022-08-08 01:00:00.000', '2022-08-08 02:00:00.000', 'reserved', '31a75bad-e1f3-42dd-9a23-79db8fc8ad96', 'bbaabb3e-b07d-4c55-86a1-53145997e945')