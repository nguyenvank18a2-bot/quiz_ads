import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tải Câu Đố Vui cho Android",
  description: "Tải và cài đặt ứng dụng Câu Đố Vui trên điện thoại Android.",
};

const APP_VERSION = "1.0.0";

export default function DownloadPage() {
  const apkUrl = process.env.NEXT_PUBLIC_ANDROID_APK_URL;
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="w-full max-w-xl rounded-3xl border border-[var(--border)] bg-white p-7 text-center shadow-sm sm:p-10">
        <div className="text-6xl" aria-hidden>🧩</div>
        <h1 className="mt-4 text-3xl font-black text-[var(--primary)]">Câu Đố Vui</h1>
        <p className="mt-3 leading-7 text-[var(--muted)]">Thử thách kiến thức với các câu đố vui tiếng Việt và lưu tiến trình của bạn.</p>
        <p className="mt-2 text-sm font-bold">Phiên bản {APP_VERSION}</p>

        {apkUrl ? <a className="primary-button mt-7 w-full px-6" href={apkUrl}>Tải APK cho Android</a> : <button className="primary-button mt-7 w-full px-6" disabled>Bản tải xuống đang được cập nhật</button>}

        <div className="mt-8 rounded-2xl bg-[var(--primary-soft)] p-5 text-left">
          <h2 className="font-black">Cách cài đặt</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 leading-6 text-[var(--muted)]">
            <li>Tải file APK về điện thoại Android.</li>
            <li>Mở file vừa tải trong trình quản lý tải xuống.</li>
            <li>Nếu Android yêu cầu, cho phép trình duyệt cài ứng dụng không rõ nguồn.</li>
            <li>Chọn Cài đặt, sau đó mở Câu Đố Vui.</li>
          </ol>
        </div>
        <p className="mt-5 text-sm text-[var(--muted)]">Chỉ bật quyền cài ứng dụng không rõ nguồn cho trình duyệt bạn vừa dùng và có thể tắt lại sau khi cài.</p>
        <Link className="mt-7 inline-flex font-bold text-[var(--primary)] hover:underline" href="/privacy">Chính sách quyền riêng tư</Link>
      </section>
    </main>
  );
}
