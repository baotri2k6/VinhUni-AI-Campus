export type Locale = "vi" | "en";
export type Theme = "light" | "dark";
export type Topic = "schedule" | "credits" | "study";

export const progress = { completed: 54, required: 120, gpa: 3.42 };

export const classes = [
  { code: "CS204", name: { vi: "Cấu trúc dữ liệu", en: "Data Structures" }, time: "08:00–09:40", room: "A2 · 304" },
  { code: "MA210", name: { vi: "Xác suất thống kê", en: "Probability and Statistics" }, time: "10:00–11:40", room: "B1 · 206" },
  { code: "CS218", name: { vi: "Cơ sở dữ liệu", en: "Database Systems" }, time: "14:00–15:40", room: "A3 · 105" },
];

export const copy = {
  vi: {
    skip: "Đến nội dung", workspace: "Không gian sinh viên", overview: "Tổng quan", schedule: "Lịch học",
    progress: "Tiến độ", theme: "Đổi giao diện", language: "Switch to English", logo: "Logo mẫu",
    student: "Hồ sơ mô phỏng", hello: "Chào An!", intro: "Xem lịch học và theo dõi tiến độ học kỳ của bạn.",
    term: "Học kỳ 1 · 2026–2027", sampleDay: "Lịch mẫu · Thứ Hai",
    gpa: "GPA tích lũy", credits: "Tín chỉ hoàn thành", classes: "Lớp trong ngày mẫu", graduation: "Tiến độ tốt nghiệp",
    degree: "Công nghệ thông tin", remaining: "tín chỉ còn lại", announcements: "Thông báo học vụ",
    notice: "Lịch đăng ký học phần", noticeBody: "Lịch minh họa · 7–11 tháng 12",
    copilot: "Hỏi Copilot", demo: "Bản mô phỏng", prompt: "Bạn muốn xem thông tin nào?",
    introChat: "Chọn một gợi ý để xem câu trả lời dựa trên hồ sơ mô phỏng.",
    close: "Đóng", send: "Gửi", message: "Tin nhắn", placeholder: "Nhập câu hỏi",
    nav: "Điều hướng sinh viên", disclaimer: "Nguyên mẫu nghiên cứu độc lập của sinh viên. Không phải dịch vụ chính thức của Trường Đại học Vinh.",
    topics: { schedule: "Xem lịch học mẫu", credits: "Xem tiến độ tín chỉ", study: "Gợi ý kế hoạch học" },
    fallback: "Bản mô phỏng hỗ trợ các câu hỏi mẫu về lịch học, tín chỉ và kế hoạch học tập.",
    study: "Gợi ý: dành 30 phút ôn cấu trúc dữ liệu, rồi làm một bài tập truy vấn SQL.",
  },
  en: {
    skip: "Skip to content", workspace: "Student workspace", overview: "Overview", schedule: "Schedule",
    progress: "Progress", theme: "Toggle theme", language: "Chuyển sang tiếng Việt", logo: "Logo placeholder",
    student: "Demo student", hello: "Hello, An!", intro: "See your classes and track your progress this semester.",
    term: "Semester 1 · 2026–2027", sampleDay: "Sample schedule · Monday",
    gpa: "Cumulative GPA", credits: "Credits earned", classes: "Classes on sample day", graduation: "Graduation progress",
    degree: "Information Technology", remaining: "credits remaining", announcements: "Academic announcements",
    notice: "Course registration dates", noticeBody: "Example dates · 7–11 December",
    copilot: "Ask Copilot", demo: "Demo mode", prompt: "What would you like to check?",
    introChat: "Choose a suggestion to see a reply based on the demo profile.",
    close: "Close", send: "Send", message: "Message", placeholder: "Type a question",
    nav: "Student navigation", disclaimer: "Independent student research prototype. This is not an official Vinh University service.",
    topics: { schedule: "View sample schedule", credits: "Check credit progress", study: "Suggest a study plan" },
    fallback: "This demo supports sample questions about classes, credits, and study plans.",
    study: "Try reviewing data structures for 30 minutes, then work through one SQL query exercise.",
  },
} satisfies Record<Locale, object>;

export function demoReply(input: string, locale: Locale) {
  const labels = copy[locale];
  const question = input.trim().toLocaleLowerCase(locale);
  const matches = (topic: Topic) => question === labels.topics[topic].toLocaleLowerCase(locale);
  if (matches("schedule")) {
    return classes.map((item) => `${item.time} · ${item.name[locale]} · ${item.room}`).join("\n");
  }
  if (matches("credits")) {
    return `${progress.completed}/${progress.required} · ${progress.required - progress.completed} ${labels.remaining}`;
  }
  if (matches("study")) return labels.study;
  return labels.fallback;
}
