export default function Connected() {
  return (
    <div className="connected relative mt-8">
      <div className="flex flex-col md:flex-row py-4 wide-load space-y-8 md:space-x-8">
        <div className="w-full md:w-1/2 flex flex-col">
          <h3>Keep Connected</h3>
          <p className="font-bold">
            Stay up to date by subscribing to our newsletter.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex flex-row space-x-4 items-center">
          <input
            type="email"
            name="email"
            className="input"
            id="email"
            placeholder="you@example.com"
          ></input>
          <div>
            <button type="submit" className="button">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
