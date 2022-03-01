import Head from 'next/head';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Recipe Haven 3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-3xl text-blue-600">Recipe Haven 3 Home</h1>
        <ul className="mx-10">
          <li>Stuff</li>
          <li>More Stuff</li>
          <li>More Stuff</li>
          <li>More Stuff</li>
          <li>More Stuff</li>
        </ul>
        <ol className="mx-10">
          <li>number stuff</li>
          <li>number stuff</li>
          <li>number stuff</li>
          <li>number stuff</li>
          <li>number stuff</li>
        </ol>
      </main>

      <footer></footer>
    </div>
  );
}
