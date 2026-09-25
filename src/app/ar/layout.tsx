import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "طلعت رمضان — مهندس برمجيات للعمل الحر",
  description:
    "مهندس برمجيات حر: ASP.NET Core وLaravel وNode.js (Express وNestJS) وAngular وNext.js. أنظمة حجز ومتاجر ولوحات تحكم وAPIs نظيفة — مختبرة وموثقة ومنشورة. مشاريع: تذكرة، OrderFlow، تميّز، هوم تك.",
};

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return <div dir="rtl" lang="ar">{children}</div>;
}
