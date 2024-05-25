export default function InputError({
  message,
}: {
  message: string | undefined;
}) {
  if (message === undefined) {
    return null;
  }
  return <small className="text-red-500">{message}</small>;
}
