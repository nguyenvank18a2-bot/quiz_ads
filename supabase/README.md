# Thiết lập Supabase

1. Tạo một project Supabase mới.
2. Mở **SQL Editor**, dán toàn bộ nội dung `schema.sql` và bấm **Run**.
3. Trong **Authentication > URL Configuration**, thêm `http://localhost:3000/auth/callback` vào Redirect URLs.
4. Sao chép `.env.example` thành `.env.local` và điền Project URL cùng Publishable key.
5. Nếu dùng Google, bật provider Google trong **Authentication > Providers** và điền Client ID/Secret từ Google Cloud.

## Database đã có sẵn (Production)

Không chạy lại `schema.sql` hoặc `admin_migration.sql` trên database đang dùng. Để khoá `claim_reward()` (không cho client tự cộng icon), chạy `claim_reward_lockdown.sql` trong **SQL Editor**; kết quả kiểm tra ở cuối file không được còn dòng `PUBLIC`, `anon` hoặc `authenticated`.

## Dữ liệu mẫu (local/dev)

Sau khi chạy `schema.sql`, chạy tiếp `seed.sql` trong **SQL Editor**. File seed có thể chạy lại nhiều lần và tạo 25 câu hỏi cùng hai tài khoản:

| Vai trò | Tài khoản | Email nội bộ | Mật khẩu | Số icon |
| --- | --- | --- | --- | ---: |
| Admin | — | `nguyenvank18a2@gmail.com` | `123456` | 999 |
| User | `andat1234` | `user@quiz.local` | `132456` | 50 |

Vai trò được lưu tại `auth.users.raw_app_meta_data.role`. Tài khoản user có sẵn 3 câu đã hoàn thành và đã mở khóa câu 11–12 để kiểm tra giao diện.

> Chỉ sử dụng các tài khoản và mật khẩu trên cho môi trường phát triển.
