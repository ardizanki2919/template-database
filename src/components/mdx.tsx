import React from "react";
import Link from "next/link";
import clsx from "clsx";
import Image, { ImageProps } from "next/image";

export default function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function CustomHeading(props: any) {
  let slug = slugify(props.children);
  return React.createElement(
    `h${props.level}`,
    {
      id: slug,
      className: clsx("scroll-mt-20 md:scroll-mt-24 inline-flex", props.className),
    },
    [
      React.createElement("a", {
        href: `#${slug}`,
        key: `link-${slug}`,
        className: "anchor-link",
      }),
    ],
    props.children
  );
}

export const H1 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className={clsx(
      // base
      "text-3xl font-bold normal-case tracking-tight sm:text-4xl",
      "text-gray-900 dark:text-gray-50"
    )}
    level={1}
  >
    {children}
  </CustomHeading>
);

export const H2 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className={clsx(
      // base
      "mb-4 font-semibold normal-case tracking-tight text-lg",
      "text-gray-900 dark:text-gray-50"
    )}
    level={2}
  >
    {children}
  </CustomHeading>
);

export const H3 = ({ children }: React.HTMLProps<HTMLHeadingElement>) => (
  <CustomHeading
    className={clsx(
      // base
      "mb-2 font-semibold normal-case tracking-tight",
      "text-gray-900 dark:text-gray-50"
    )}
    level={3}
  >
    {children}
  </CustomHeading>
);

export const P = (props: React.HTMLProps<HTMLParagraphElement>) => (
  <p
    {...props}
    className={clsx(
      // base
      "mb-8 leading-7",
      "text-gray-600 dark:text-gray-400"
    )}
  />
);

export const Ul = (props: React.HTMLAttributes<HTMLUListElement>) => (
  <ul
    className={clsx(
      // base
      "list-['–__'] mb-10 ml-[30px] space-y-1 leading-8",
      "text-gray-600 dark:text-gray-400"
    )}
    {...props}
  />
);

export const Bold = (props: React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={clsx(
      // base
      "font-semibold",
      "text-gray-900 dark:text-gray-50"
    )}
    {...props}
  />
);

export function CustomLink(props: any) {
  let href = props.href;
  const style =
    "text-indigo-600 font-medium hover:text-indigo-500 dark:text-indigo-400 hover:dark:text-indigo-300";
  if (href.startsWith("/")) {
    return (
      <Link className={style} href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} className={style} />;
  }

  return (
    <a className={style} target="_blank" rel="noopener noreferrer" {...props} />
  );
}

export const ChangelogEntry = ({
  version,
  date,
  children,
}: {
  version: string;
  date: string;
  children: any;
}) => (
  <div
    className={clsx(
      // base
      "relative flex flex-col md:flex-row justify-center gap-x-14 my-20 border-b"
    )}
  >
    <div className="md:w-1/3 md:mb-10 mb-4">
      <div className="sticky top-24 flex items-center space-x-2 md:block md:space-x-0 md:space-y-1.5">
        <span className="inline-flex items-center ring-1 ring-inset ring-indigo-700/10 dark:ring-indigo-400/10 bg-indigo-50 dark:bg-indigo-500/20 px-2.5 py-1 text-indigo-700 dark:text-indigo-400 font-medium rounded-lg text-xs">
          {version}
        </span>
        <span className="whitespace-nowrap block text-sm text-gray-600 dark:text-gray-400">
          {date}
        </span>
      </div>
    </div>
    <div className="mb-12">{children}</div>
  </div>
);

export const ChangelogImage = ({
  alt,
  width = 1200,
  height = 675,
  src,
  ...props
}: ImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="overflow-hidden rounded-xl mb-10 shadow-md shadow-black/15 ring-1 ring-gray-200/50 dark:ring-gray-800"
    {...props}
  />
);
