import CardList from "../components/baru/CardList";
import ViewUserButton from "../components/baru/ViewUserButton";
const base_url = "https://jsonplaceholder.typicode.com/posts";
interface Iposts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Baru = async () => {
  const response = await fetch(base_url, {
    cache: "no-store", //dynamic rendering: render terus2an | static renderng: render sekali saja dalam proses run build
    // next: { revalidate: 3600 }, // setiap 1 jam akan mencari dan melakukan perubahan data
  });
  const posts: Iposts[] = await response.json();
  return (
    <>
      <p>{new Date().toLocaleTimeString()}</p>
      <div className="text-fuchsia-500">Ini halaman baru</div>
      {posts.map((post) => {
        return (
          <>
            <CardList key={post.id}>
              <p>{post.id}</p>
              <p>{post.body}</p>
              <i>{post.title}</i>
              <br />
              <ViewUserButton userId={post.userId} />
            </CardList>
          </>
        );
      })}
    </>
  );
};
export default Baru;
