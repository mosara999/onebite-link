import type { Metadata } from "next";
import LinkForm from "@/components/link-form";

export const metadata: Metadata = {
  title: "새 링크 추가",
  description: "새로운 링크를 저장하고 폴더에 정리하세요.",
};

export default function NewLinkPage() {
  return <LinkForm />;
}
