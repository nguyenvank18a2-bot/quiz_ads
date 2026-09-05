import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chính sách quyền riêng tư | Câu Đố Vui",
  description: "Chính sách quyền riêng tư của ứng dụng Câu Đố Vui.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-10">
      <article className="mx-auto max-w-3xl rounded-3xl border border-[var(--border)] bg-white p-6 shadow-sm sm:p-10">
        <p className="font-bold text-[var(--primary)]">Câu Đố Vui</p>
        <h1 className="mt-2 text-3xl font-black">Chính sách quyền riêng tư</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">Cập nhật ngày 04/09/2026</p>

        <div className="mt-8 space-y-7 leading-7 [&_h2]:mb-1.5 [&_h2]:text-lg [&_h2]:font-extrabold [&_h2]:text-[var(--primary)] [&_p]:text-[var(--muted)]">
          <section><h2>Thông tin chúng tôi xử lý</h2><p>Khi bạn đăng ký hoặc đăng nhập, ứng dụng xử lý thông tin tài khoản như email, tên hiển thị và mã định danh người dùng. Ứng dụng cũng lưu tiến trình trả lời câu hỏi, các câu đã mở khóa và số icon trong tài khoản.</p></section>
          <section><h2>Dịch vụ backend</h2><p>Câu Đố Vui sử dụng Supabase để xác thực tài khoản, lưu hồ sơ, tiến trình chơi và số icon. Dữ liệu được gửi đến Supabase để cung cấp các chức năng này.</p></section>
          <section><h2>Quảng cáo Google Mobile Ads</h2><p>Ứng dụng sử dụng Google Mobile Ads để hiển thị quảng cáo có thưởng. Google và các đối tác quảng cáo có thể xử lý địa chỉ IP, hoạt động tương tác với quảng cáo, thông tin chẩn đoán và mã nhận dạng thiết bị để phân phối, đo lường, bảo vệ và cải thiện quảng cáo.</p></section>
          <section><h2>Mục đích sử dụng</h2><p>Chúng tôi xử lý dữ liệu để đăng nhập, duy trì hồ sơ, lưu tiến trình chơi, quản lý icon, cung cấp phần thưởng quảng cáo, ngăn gian lận và khắc phục lỗi.</p></section>
          <section><h2>Lựa chọn quyền riêng tư quảng cáo</h2><p>Khi Google yêu cầu, ứng dụng sẽ hiển thị biểu mẫu xin lựa chọn quyền riêng tư. Bạn có thể mở lại lựa chọn này trong trang <strong>Tài khoản</strong>, mục <strong>Quyền riêng tư quảng cáo</strong>.</p></section>
          <section><h2>Xóa tài khoản và dữ liệu</h2><p>Bạn có thể yêu cầu xóa tài khoản và dữ liệu gắn với tài khoản. <strong>TODO trước khi phát hành: bổ sung địa chỉ email hoặc kênh liên hệ thật để tiếp nhận yêu cầu xóa dữ liệu.</strong></p></section>
          <section><h2>Liên hệ</h2><p><strong>TODO trước khi phát hành: bổ sung thông tin liên hệ thật của đơn vị hoặc cá nhân vận hành ứng dụng.</strong></p></section>
        </div>

        <Link className="mt-9 inline-flex font-bold text-[var(--primary)] hover:underline" href="/">Về trang chủ</Link>
      </article>
    </main>
  );
}
