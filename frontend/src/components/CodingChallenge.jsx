import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useCodeContext } from '../context/CodeContext';

const CodingChallenge = () => {
  // Get values from context instead of props
  const { question, setQuestion, userId, loading: loadingContext, generateNewQuestion } = useCodeContext();
  
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [timeTaken, setTimeTaken] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [passedTests, setPassedTests] = useState(0);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [editorLanguage, setEditorLanguage] = useState('javascript');
  const [analysis, setAnalysis] = useState(null);
  const [weaknesses, setWeaknesses] = useState([]);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'cpp', label: 'C++' },
  ];

  // Set start time when question loads
  useEffect(() => {
    if (question && !startTime) {
      setStartTime(Date.now());
    }
  }, [question, startTime]);

  // Update editor language on change
  useEffect(() => {
    setEditorLanguage(language === 'csharp' ? 'cpp' : language);
  }, [language]);

  const handleRun = async () => {
    if (!question) return;
    setLoading(true);
    setOutput('Running code against all test cases...');

    try {
      const res = await axios.post('https://code-forge.onrender.com/submit', {
        language,
        source_code: code,
        testCases: question?.testcases || [],
      });

      const formattedOutput = res.data.results.map((result, index) => {
        return `Test Case ${index + 1}:\n` +
               `Input: ${question.testcases[index].input}\n` +
               `Expected: ${question.testcases[index].output}\n` +
               `Received: ${result.actual_output}\n` +
               `Status: ${result.passed ? '✓ Passed' : '✗ Failed'}\n` +
               `${result.error ? `Error: ${result.error}\n` : ''}` +
               `----------------------------------`;
      }).join('\n\n');

      setOutput(formattedOutput);
    } catch (err) {
      setOutput('Error running code. Please check your implementation.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!question) return;
    setLoading(true);
    const endTime = Date.now();
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    setTimeTaken(timeSpent);
    setAttempts(prev => prev + 1);
    setSubmitted(true);

    try {
      const res = await axios.post('https://code-forge.onrender.com/submit', {
        language,
        source_code: code,
        testCases: question.testcases,
      });

      const passedCount = res.data.results.filter(result => result.passed).length;
      setPassedTests(passedCount);

      if (passedCount === question.testcases.length) {
        setOutput(`✓ All ${question.testcases.length} test cases passed!\nTime taken: ${timeSpent} seconds\nAttempts: ${attempts + 1}`);

        try {
          const analysisRes = await axios.post('https://code-forge.onrender.com/analyze', {
            code,
            language,
            question,
            testResults: res.data.results,
            attempts: attempts + 1,
            timeSpentInSeconds: timeSpent,
            previousWeaknesses: weaknesses,
          });

          setAnalysis(analysisRes.data.analysis);
          setWeaknesses(analysisRes.data.weaknesses);
        } catch (analysisError) {
          console.error('Analysis failed:', analysisError);
        }
      } else {
        const failedDetails = res.data.results
          .filter(result => !result.passed)
          .map((result, index) => `Failed Test ${index + 1}: Expected ${result.expected_output}, Got ${result.actual_output}`)
          .join('\n');

        setOutput(`✗ ${passedCount}/${question.testcases.length} test cases passed\n\nFailed Cases:\n${failedDetails}\n\nTime taken: ${timeSpent} seconds\nAttempts: ${attempts + 1}`);
      }
    } catch (err) {
      setOutput('Error submitting code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    setCode('');
    setOutput('');
    setAttempts(0);
    setTimeTaken(0);
    setShowHint(false);
    setSubmitted(false);
    setPassedTests(0);
    setAnalysis(null);
    setWeaknesses([]);
    setLanguage('javascript');
    setEditorLanguage('javascript');
    setStartTime(Date.now());
    
    // Use the context function to generate a new question
    await generateNewQuestion();
  };

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  if (loadingContext || !question) {
    return <div className="text-white p-10 text-lg">Loading question...</div>;
  }

  return (
    <div className="fixed inset-0 bg-gray-900 text-gray-100 flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        {/* Question Area */}
        <div className="w-1/2 bg-gray-800 overflow-y-auto p-6 border-r border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400 mb-4">{question.title}</h1>
          <p className="mb-4 text-gray-300">{question.description}</p>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Input Format:</h2>
            <p className="font-mono text-sm text-gray-300 bg-gray-700 p-2 rounded">{question.input_format}</p>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Output Format:</h2>
            <p className="font-mono text-sm text-gray-300 bg-gray-700 p-2 rounded">{question.output_format}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-blue-400 mb-2">Sample Test Cases:</h2>
            {question?.test_cases?.map((testcase, index) => (
              <div key={index} className="mb-4 bg-gray-700 p-3 rounded">
                <p className="font-mono text-sm text-gray-200 mb-1">
                  <span className="text-blue-300">Input:</span> {JSON.stringify(testcase.input)}
                </p>
                <p className="font-mono text-sm text-gray-200">
                  <span className="text-blue-300">Output:</span> {JSON.stringify(testcase.output)}
                </p>
              </div>
            ))}
          </div>

          {attempts >= 3 && !showHint && (
            <button 
              onClick={toggleHint}
              disabled={loading}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Need Help? Get a Hint
            </button>
          )}

          {showHint && (
            <div className="mt-4 bg-gray-700 p-4 rounded border border-blue-500">
              <h3 className="text-blue-400 font-semibold mb-2">Hint</h3>
              <p className="text-gray-300">{question.hint}</p>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="w-1/2 flex flex-col bg-gray-800 border-l border-gray-700">
          <div className="flex items-center justify-between bg-gray-900 p-2 border-b border-gray-700">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 text-white rounded px-3 py-1 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
            <div className="text-sm text-gray-400">
              {attempts > 0 && <span>Attempts: {attempts} | </span>}
              {timeTaken > 0 && <span>Time: {timeTaken}s</span>}
            </div>
          </div>

          <div className="flex-1">
            <Editor
              height="100%"
              width="100%"
              language={editorLanguage}
              theme="vs-dark"
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>

          <div className="bg-gray-900 p-4 border-t border-gray-700">
            <div className="flex space-x-3">
              <button 
                onClick={handleRun}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-black font-medium py-2 px-6 rounded-md"
              >
                {loading ? 'Running...' : 'Run (All Tests)'}
              </button>
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-6 rounded-md"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              {submitted && (
                <button
                  onClick={handleNext}
                  className="bg-blue-600 hover:bg-blue-700 text-black font-medium py-2 px-6 rounded-md"
                >
                  Next Question
                </button>
              )}
            </div>
            <div className="mt-4 text-sm text-gray-300">
              {output && <pre className="bg-gray-700 p-4 rounded">{output}</pre>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingChallenge;