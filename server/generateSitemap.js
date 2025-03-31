import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

const links = [
  { url: "/", changefreq: "daily", priority: 0.7 },
  { url: "/about", changefreq: "monthly", priority: 0.3 },
  { url: "/register", changefreq: "monthly", priority: 0.5 },
  { url: "/payment", changefreq: "monthly", priority: 0.5 },
  { url: "/policy", changefreq: "monthly", priority: 0.3 },
  { url: "/exams", changefreq: "weekly", priority: 0.5 },
  { url: "/signs", changefreq: "weekly", priority: 0.5 },
  { url: "/practice", changefreq: "weekly", priority: 0.5 },
  { url: "/dashboard", changefreq: "weekly", priority: 0.4 },
];

const dynamicTicketIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32,
];

dynamicTicketIds.forEach((id) => {
  links.push({ url: `/tickets/${id}`, changefreq: "daily", priority: 0.6 });
});

const generateSitemap = async () => {
  const stream = new SitemapStream({ hostname: "http://brainhouse.ge" });
  return streamToPromise(Readable.from(links).pipe(stream)).then((data) =>
    data.toString()
  );
};

export default generateSitemap;
