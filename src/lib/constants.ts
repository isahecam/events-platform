export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Summit 2025",
    image: "/images/event1.png",
    slug: "react-summit-2025",
    location: "Amsterdam, Netherlands",
    date: "June 13-17, 2025",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "AWS re:Invent",
    image: "/images/event2.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV",
    date: "December 1-5, 2025",
    time: "8:00 AM - 7:00 PM",
  },
  {
    title: "DevOps Days Seattle",
    image: "/images/event3.png",
    slug: "devops-days-seattle",
    location: "Seattle, WA",
    date: "May 20-21, 2025",
    time: "9:00 AM - 5:00 PM",
  },
  {
    title: "PyCon US 2025",
    image: "/images/event4.png",
    slug: "pycon-us-2025",
    location: "Pittsburgh, PA",
    date: "May 14-22, 2025",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "GitHub Universe",
    image: "/images/event5.png",
    slug: "github-universe-2025",
    location: "San Francisco, CA",
    date: "November 5-6, 2025",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "ViteConf 2025",
    image: "/images/event6.png",
    slug: "viteconf-2025",
    location: "Virtual Event",
    date: "October 9, 2025",
    time: "10:00 AM - 8:00 PM",
  },
];
