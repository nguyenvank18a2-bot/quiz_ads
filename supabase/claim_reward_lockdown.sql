-- Khoá claim_reward() cho database đã có sẵn (ví dụ Production).
-- Dùng file này thay vì chạy lại admin_migration.sql: file đó không chạy lại được (lỗi "policy already exists").
-- Chạy lại nhiều lần không lỗi, không đổi dữ liệu. Icon từ quảng cáo chỉ được cộng qua SSV của app Android.
do $$
begin
  if to_regprocedure('public.claim_reward()') is not null then
    revoke execute on function public.claim_reward() from public, anon, authenticated;
  end if;
end $$;

-- Kiểm tra: kết quả không được còn dòng PUBLIC, anon hoặc authenticated.
select grantee, privilege_type
from information_schema.routine_privileges
where routine_schema = 'public' and routine_name = 'claim_reward';

-- Rollback (chỉ khi cần khôi phục hành vi cũ, sẽ mở lại việc cộng Icon không cần quảng cáo):
-- grant execute on function public.claim_reward() to authenticated;
