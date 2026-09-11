export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="bg-red-200 p-20 rounded-3xl">
        <h1 className="text-center text-4xl">Page Not Found</h1>
        <p className="text-2xl">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
