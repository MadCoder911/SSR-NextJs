const UserProfilePage = (props) => {
  return <h1>{props.username}</h1>;
};
export default UserProfilePage;

export async function getServerSideProps(context) {
  // generate pages dynamicly on the server
  const { params, req, res } = context;

  return {
    props: {
      username: "Max",
    },
  };
}
