"use client";
import { Loading } from "@/components/loading";
import { Tag } from "@/components/tag";
import Image from "next/image";
import Link from "next/link";
import { useHomepage } from "../useHomepage";
import styles from "./styles.module.scss";

function ResultImage() {
  const { isSubmitting, error, image, prompt } = useHomepage();

  if (error) return <p className={styles.error}>{error.message}</p>;
  if (!isSubmitting && !image) return null;

  return (
    <div styles={styles.resultImage}>
      <div className={styles.animation}>
        {isSubmitting ? (
          <Loading />
        ) : (
          <>
            <div className={styles.content}>
              <p>{prompt}</p>
              <Tag
                title={
                  <Link href={image} target="_blank" download>
                    Download
                  </Link>
                }
              />
            </div>
            <Image src={image} alt={prompt} width={512} height={512} />
          </>
        )}
      </div>
    </div>
  );
}

export { ResultImage };
