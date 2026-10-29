import './App.css';
import { type SubmitEventHandler, useState } from 'react';
import { timestampToUtc } from './timestamp.ts';

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
      <h1>Unix timestamp 변환기</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="timestamp">Unix timestamp</label>
        <p id="timestampHelp">초 단위 정수를 입력해 주세요.</p>

        <input
          id="timestamp"
          type="text"
          value={timestampInput}
          onChange={(event) => setTimestampInput(event.target.value)}
          aria-describedby={errorMessage ? 'timestampHelp timestampError' : 'timestampHelp'}
          aria-invalid={!!errorMessage}
          style={{ border: errorMessage ? '2px solid red' : undefined }}
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
