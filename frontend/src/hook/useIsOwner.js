export default function useIsOwner(sellerId) {
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  return loggedInUser?.id === sellerId;
}


