import Seo from "../components/Seo";

export default function MovieDetail({ potato }) {
  // const router = useRouter();
  // const [title, id] = router.query.potato || [];
  const [title, id] = potato || [];

  return (
    <div>
      <Seo title={title} />
      <h4>{title || "Loading....."}</h4>
    </div>
  );
}

export function getServerSideProps({ params: { potato } }) {
  console.log(potato);
  return {
    props: { potato },
  };
}
