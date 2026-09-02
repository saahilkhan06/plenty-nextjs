export default function DropdownActions({
  onClear,
  onDone,
}: {
  onClear: () => void;
  onDone: () => void;
}) {
  return (
    <div className="flex gap-3 border-t p-4">
      <button
        type="button"
        onClick={onClear}
        className="flex-1 rounded-md border border-gray-300 py-2.5 font-semibold text-gray-900 hover:bg-gray-50"
      >
        Clear
      </button>
      <button
        type="button"
        onClick={onDone}
        className="flex-1 rounded-md bg-yellow-400 py-2.5 font-semibold text-gray-900 hover:bg-yellow-500"
      >
        Done
      </button>
    </div>
  );
}