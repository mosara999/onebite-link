import type { LinkItem } from "@/lib/types";

type MockFolder = {
  id: string;
  name: string;
};

export const folders: MockFolder[] = [
  { id: "dev", name: "개발" },
  { id: "design", name: "디자인" },
  { id: "reading", name: "읽을거리" },
  { id: "youtube", name: "유튜브" },
];

export const links: LinkItem[] = [
  {
    id: "1",
    title: "Next.js 공식 문서",
    url: "https://nextjs.org/docs",
    description: "App Router와 최신 기능을 정리한 Next.js 공식 문서",
    folderId: "dev",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    description: "웹 표준 기술을 학습할 때 가장 먼저 찾아보는 레퍼런스",
    folderId: "dev",
  },
  {
    id: "3",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com/docs",
    description: "유틸리티 클래스로 빠르게 스타일링할 수 있는 CSS 프레임워크",
    folderId: "dev",
  },
  {
    id: "4",
    title: "Dribbble",
    url: "https://dribbble.com",
    description: "다양한 UI 디자인 영감을 얻을 수 있는 디자인 커뮤니티",
    folderId: "design",
  },
  {
    id: "5",
    title: "Coolors",
    url: "https://coolors.co",
    description: "빠르게 색상 팔레트를 생성하고 테스트할 수 있는 도구",
    folderId: "design",
  },
  {
    id: "6",
    title: "이펙티브 엔지니어",
    url: "https://example.com/effective-engineer",
    description: "레버리지 높은 일을 찾아서 하는 방법에 대한 글",
    folderId: "reading",
  },
  {
    id: "7",
    title: "당근 테크블로그",
    url: "https://medium.com/daangn",
    description: "당근마켓 팀이 공유하는 기술 아티클 모음",
    folderId: "reading",
  },
  {
    id: "8",
    title: "코딩애플",
    url: "https://youtube.com/@codingapple",
    description: "실전 웹 개발 강의를 다루는 유튜브 채널",
    folderId: "youtube",
  },
];

export function getFolderName(folderId: string) {
  return folders.find((folder) => folder.id === folderId)?.name ?? folderId;
}
