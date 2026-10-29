import './App.css';
import { type SubmitEventHandler, useState } from 'react';
import { timestampToUtc } from './features/timestamp/utils/timestamp.ts';

function App() {
  const [timestampInput, setTimestampInput] = useState('');
  const [utcResult, setUtcResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setUtcResult('');
    setErrorMessage('');

    try {
      setUtcResult(timestampToUtc(timestampInput));
    } catch (caughtError) {
      if (caughtError instanceof Error) {
        setErrorMessage(caughtError.message);
      } else {
        throw caughtError;
      }
    }
  };

  return (
    <main>
      <h1 className="text-3xl font-bold underline">Unix timestamp 변환기</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="timestamp">Unix timestamp</label>
        <p id="timestampHelp">초 단위 정수를 입력해 주세요.</p>

        <input
          id="timestampInput"
          type="text"
          value={timestampInput}
          onChange={(event) => {
            setTimestampInput(event.target.value);
            setUtcResult('');
            setErrorMessage('');
          }}
          aria-describedby={errorMessage ? 'timestampHelp timestampError' : 'timestampHelp'}
          aria-invalid={!!errorMessage}
        />
        <button type="submit">변환</button>

        {errorMessage && (
          <p id="timestampError" role="alert">
            {errorMessage}
          </p>
        )}
      </form>
      {utcResult && (
        <section>
          <h2 id="utcResultHeading">UTC 변환 결과</h2>
          <output>{utcResult}</output>
        </section>
      )}
    </main>
  );
}

export default App;
