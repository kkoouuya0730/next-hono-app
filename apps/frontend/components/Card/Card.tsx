"use client";

import Image from "next/image";
import Link from "next/link";
import { IconButton } from "../Button/IconButton";
import styles from "./Card.module.css";

type CardProps = {
  post: {
    id: string;
    content: string;
  };
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  onPostClick?: () => void;
  onMoreClick?: () => void;
};

export const Card = ({ post, user, onPostClick, onMoreClick }: CardProps) => {
  const profileHref = `/users/${user.id}`;

  return (
    <article
      className={styles.container}
      role="link"
      tabIndex={0}
      onClick={onPostClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onPostClick?.();
        }
      }}
    >
      <div className={styles.avatarWrapper}>
        <Image src={user.avatarUrl} alt="" fill sizes="48px" className={styles.avatar} />
      </div>{" "}
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <div className={styles.userInfo}>
            <Link href={profileHref} className={styles.userName} onClick={(e) => e.stopPropagation()}>
              {user.name}
            </Link>
            <span className={styles.userId}>@{user.id}</span>
          </div>

          <IconButton
            iconName="ellipsisHorizontal"
            ariaLabel="もっと見る"
            onClick={(e) => {
              e.stopPropagation();
              onMoreClick?.();
            }}
          />
        </div>

        <p className={styles.content}>{post.content}</p>
      </div>
    </article>
  );
};
