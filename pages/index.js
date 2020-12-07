import Head from "next/head"
import Link from "next/link"


export default function Index({current}) {
  return (
    <div>
        現在時刻は{current}です。
    </div>
  );
}

// Change method from getServerSideProps to getStaticProps for testing SSR/ISG behavior.
export async function getStaticProps() {
    const date = new Date();
    const current = date.toLocaleString()
  return {
    props: {
      current,
    },
    revalidate: 10,
  };
}

