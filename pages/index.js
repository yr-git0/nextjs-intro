import Link from "next/link";
import Seo from "./components/Seo";
import { useRouter } from "next/router";

// async function getData() {
//   const res = await fetch(`http://localhost:3000/api/movies`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }

//   const { results } = await res.json();
//   return results;
// }

export default function Home({ results }) {
  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const data = await getData();
  //       setMovies(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   fetchData();
  // }, []);
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
    // router.push(
    //   {
    //     pathname: `/movies/${title}/${id}`,
    //     // query: {
    //     //   title: `${title}`,
    //     // },
    //   },
    //   `/movies/${title}/${id}`
    // );
  };

  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <Link
          href={`/movies/${movie.original_title}/${movie.id}`}
          key={movie.id}
        >
          <div
            onClick={() => onClick(movie.id, movie.title)}
            className="movie"
            key={movie.id}
          >
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h4>{movie.original_title}</h4>
          </div>
        </Link>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          cursor: pointer;
        }
        .movie img {
          max-width: 100%;
          border-radius: 12px;
          transition: transform 0.2s ease-in-out;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
        }
        .movie:hover img {
          transform: scale(1.05) translateY(-10px);
        }
        .movie h4 {
          font-size: 18px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
