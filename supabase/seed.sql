-- Du lieu mau cho moi truong local/dev.
-- Chay schema.sql truoc, sau do chay file nay trong Supabase SQL Editor.
-- Khong dung cac mat khau mau nay tren moi truong production.

create extension if not exists pgcrypto;

do $$
declare
  admin_id constant uuid := '10000000-0000-4000-8000-000000000001';
  user_id  constant uuid := '10000000-0000-4000-8000-000000000002';
begin
  insert into auth.users (
    instance_id, id, aud, role, email, encrypted_password,
    email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
    created_at, updated_at, confirmation_token, recovery_token,
    email_change_token_new, email_change
  ) values
  (
    '00000000-0000-0000-0000-000000000000', admin_id,
    'authenticated', 'authenticated', 'nguyenvank18a2@gmail.com',
    crypt('123456', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"],"role":"admin"}'::jsonb,
    '{"username":"admin123","display_name":"Quản trị viên"}'::jsonb,
    now(), now(), '', '', '', ''
  ),
  (
    '00000000-0000-0000-0000-000000000000', user_id,
    'authenticated', 'authenticated', 'user@quiz.local',
    crypt('132456', gen_salt('bf')), now(),
    '{"provider":"email","providers":["email"],"role":"user"}'::jsonb,
    '{"username":"andat1234","display_name":"An Đạt"}'::jsonb,
    now(), now(), '', '', '', ''
  )
  on conflict (id) do update set
    email = excluded.email,
    encrypted_password = excluded.encrypted_password,
    email_confirmed_at = excluded.email_confirmed_at,
    raw_app_meta_data = excluded.raw_app_meta_data,
    raw_user_meta_data = excluded.raw_user_meta_data,
    updated_at = now();

  insert into auth.identities (
    id, provider_id, user_id, identity_data, provider,
    last_sign_in_at, created_at, updated_at
  ) values
  (
    admin_id, admin_id::text, admin_id,
    jsonb_build_object('sub', admin_id::text, 'email', 'nguyenvank18a2@gmail.com', 'email_verified', true),
    'email', now(), now(), now()
  ),
  (
    user_id, user_id::text, user_id,
    jsonb_build_object('sub', user_id::text, 'email', 'user@quiz.local', 'email_verified', true),
    'email', now(), now(), now()
  )
  on conflict (provider_id, provider) do update set
    identity_data = excluded.identity_data,
    updated_at = now();

  insert into public.profiles (id, display_name, icon_balance) values
    (admin_id, 'Quản trị viên', 999),
    (user_id, 'An Đạt', 50)
  on conflict (id) do update set
    display_name = excluded.display_name,
    icon_balance = excluded.icon_balance;
end $$;

insert into public.questions
  (question, choices, correct_answer, explanation, category, sort_order)
values
  ('Chiến dịch Điện Biên Phủ kết thúc vào năm nào?', '["1952","1953","1954","1955"]', 2, 'Chiến dịch Điện Biên Phủ kết thúc thắng lợi ngày 7 tháng 5 năm 1954.', 'Lịch sử', 1),
  ('Đỉnh núi cao nhất Việt Nam là gì?', '["Fansipan","Ngọc Linh","Bạch Mã","Langbiang"]', 0, 'Fansipan là đỉnh núi cao nhất Việt Nam.', 'Địa lý', 2),
  ('Nguyên tố hóa học nào có ký hiệu O?', '["Vàng","Oxy","Sắt","Bạc"]', 1, 'O là ký hiệu hóa học của nguyên tố oxy.', 'Khoa học', 3),
  ('Thủ đô của Việt Nam là gì?', '["TP. Hồ Chí Minh","Đà Nẵng","Hà Nội","Huế"]', 2, 'Hà Nội là thủ đô của Việt Nam.', 'Địa lý', 4),
  ('Loài vật nào thường được gọi là chúa sơn lâm?', '["Voi","Hổ","Gấu","Báo"]', 1, 'Hổ thường được gọi là chúa sơn lâm.', 'Thế giới', 5),
  ('Một tuần có bao nhiêu ngày?', '["5","6","7","8"]', 2, 'Một tuần có 7 ngày.', 'Đời sống', 6),
  ('Hành tinh nào gần Mặt Trời nhất?', '["Sao Kim","Trái Đất","Sao Hỏa","Sao Thủy"]', 3, 'Sao Thủy gần Mặt Trời nhất.', 'Khoa học', 7),
  ('Tác giả Dế Mèn phiêu lưu ký là ai?', '["Tô Hoài","Nam Cao","Ngô Tất Tố","Xuân Diệu"]', 0, 'Tô Hoài là tác giả của tác phẩm.', 'Văn học', 8),
  ('Trộn xanh dương và vàng tạo ra màu gì?', '["Tím","Cam","Xanh lá","Đỏ"]', 2, 'Hai màu này tạo thành màu xanh lá.', 'Nghệ thuật', 9),
  ('Nước đóng băng ở bao nhiêu độ C?', '["0°C","10°C","50°C","100°C"]', 0, 'Ở áp suất tiêu chuẩn, nước đóng băng tại 0°C.', 'Khoa học', 10),
  ('Nhạc cụ nào thường có 88 phím?', '["Guitar","Piano","Đàn tranh","Sáo"]', 1, 'Piano tiêu chuẩn thường có 88 phím.', 'Âm nhạc', 11),
  ('Quốc kỳ Việt Nam có ngôi sao màu gì?', '["Trắng","Xanh","Vàng","Đen"]', 2, 'Quốc kỳ Việt Nam có ngôi sao vàng.', 'Đời sống', 12),
  ('Con vật nào là động vật có vú sống dưới biển?', '["Cá mập","Cá heo","Cá ngừ","Bạch tuộc"]', 1, 'Cá heo thở bằng phổi và nuôi con bằng sữa.', 'Thế giới', 13),
  ('Số nào sau đây là số nguyên tố?', '["9","15","17","21"]', 2, '17 chỉ chia hết cho 1 và chính nó.', 'Toán học', 14),
  ('Châu lục lớn nhất thế giới là châu nào?', '["Châu Âu","Châu Phi","Châu Á","Châu Mỹ"]', 2, 'Châu Á có diện tích lớn nhất.', 'Địa lý', 15),
  ('Kết quả của 12 × 8 là bao nhiêu?', '["86","92","96","108"]', 2, '12 nhân 8 bằng 96.', 'Toán học', 16),
  ('Ai là tác giả Truyện Kiều?', '["Nguyễn Du","Nguyễn Trãi","Hồ Xuân Hương","Nguyễn Đình Chiểu"]', 0, 'Nguyễn Du là tác giả Truyện Kiều.', 'Văn học', 17),
  ('Cơ quan nào bơm máu đi khắp cơ thể?', '["Phổi","Gan","Tim","Thận"]', 2, 'Tim co bóp để đưa máu đi khắp cơ thể.', 'Khoa học', 18),
  ('Đại dương lớn nhất trên Trái Đất là gì?', '["Đại Tây Dương","Ấn Độ Dương","Bắc Băng Dương","Thái Bình Dương"]', 3, 'Thái Bình Dương là đại dương lớn nhất.', 'Địa lý', 19),
  ('Từ nào đồng nghĩa với “dũng cảm”?', '["Can đảm","Nhút nhát","Lười biếng","Vội vàng"]', 0, 'Can đảm và dũng cảm có nghĩa gần giống nhau.', 'Tiếng Việt', 20),
  ('Một giờ có bao nhiêu phút?', '["30","45","60","90"]', 2, 'Một giờ có 60 phút.', 'Đời sống', 21),
  ('Quốc gia nào có hình dáng giống chiếc ủng?', '["Pháp","Ý","Đức","Hy Lạp"]', 1, 'Bản đồ nước Ý thường được ví như chiếc ủng.', 'Địa lý', 22),
  ('Khí nào chiếm tỉ lệ lớn nhất trong không khí?', '["Oxy","Nitơ","Carbon dioxide","Hydro"]', 1, 'Nitơ chiếm khoảng 78% khí quyển Trái Đất.', 'Khoa học', 23),
  ('Số La Mã X tương ứng với số nào?', '["5","10","50","100"]', 1, 'Ký hiệu X trong số La Mã là 10.', 'Toán học', 24),
  ('Tết Trung thu diễn ra vào ngày nào âm lịch?', '["Mùng 1 tháng 1","15 tháng 7","15 tháng 8","23 tháng Chạp"]', 2, 'Tết Trung thu là rằm tháng Tám âm lịch.', 'Văn hóa', 25)
on conflict (sort_order) do update set
  question = excluded.question,
  choices = excluded.choices,
  correct_answer = excluded.correct_answer,
  explanation = excluded.explanation,
  category = excluded.category;

-- Tao san mot vai ket qua de giao dien tai khoan co du lieu thong ke.
insert into public.user_progress (user_id, question_id, selected_answer, is_correct, completed_at)
select '10000000-0000-4000-8000-000000000002'::uuid, id, correct_answer, true, now()
from public.questions
where sort_order between 1 and 3
on conflict (user_id, question_id) do update set
  selected_answer = excluded.selected_answer,
  is_correct = excluded.is_correct,
  completed_at = excluded.completed_at;

insert into public.user_unlocks (user_id, question_id)
select '10000000-0000-4000-8000-000000000002'::uuid, id
from public.questions
where sort_order in (11, 12)
on conflict (user_id, question_id) do nothing;
