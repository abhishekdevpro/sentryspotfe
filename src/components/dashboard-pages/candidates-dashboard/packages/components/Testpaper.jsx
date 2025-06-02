import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Constant } from '@/utils/constant/constant';
import ConfirmationDialog from '@/components/community/ConfirmationDialog';
import { Clock, Cross, X } from 'lucide-react';

const TestPaper = () => {
  const { skillId, skillName } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [skillAssessmentId, setSkillAssessmentId] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // 10 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  
  // Use ref to store answers
  const answersRef = useRef({});

  // Load saved answers when component mounts
  useEffect(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`test_answers_${skillId}`) || '{}');
    setSelectedAnswers(savedAnswers);
  }, [skillId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        console.log('Fetching questions...');
        const response = await axios.get(
          `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment`,
          {
            params: {
              skill_id: parseInt(skillId),
              skill_name: skillName
            },
            headers: {
              Authorization: ` ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const { questions: fetchedQuestions, skill_assessment_id } = response.data.data;
        console.log('Fetched Questions:', fetchedQuestions);
        console.log('Skill Assessment ID:', skill_assessment_id);
        if (!fetchedQuestions || !Array.isArray(fetchedQuestions)) {
          throw new Error('Invalid questions data received');
        }

        setQuestions(fetchedQuestions);
        setSkillAssessmentId(skill_assessment_id);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch questions');
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [skillId, skillName, navigate]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;
    if (!showResults) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            setIsTimeUp(true);
            // Automatically submit the test when time is up
            handleSubmitTest(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showResults]); // Added showResults as dependency

  const handleAnswerSelect = (questionId, selectedAnswer) => {
    if (isTimeUp) return;
    
    setSelectedAnswers(prevAnswers => {
      const newAnswers = {
        ...prevAnswers,
        [questionId]: selectedAnswer
      };
      // Save to localStorage immediately
      localStorage.setItem(`test_answers_${skillId}`, JSON.stringify(newAnswers));
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmitTest = async (isAutoSubmit = false) => {
    const token = localStorage.getItem(Constant.USER_TOKEN);
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      console.log('Submitting test with Skill Assessment ID:', skillAssessmentId);
      setLoading(true);
      
      if (!isAutoSubmit) {
        const unansweredQuestions = questions.filter(q => !selectedAnswers[q.id]);
        if (unansweredQuestions.length > 0) {
          setError(`Please answer all questions before submitting. ${unansweredQuestions.length} questions remaining.`);
          setLoading(false);
          return;
        }
      }

      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/jobseeker/skill-assessment/${skillAssessmentId}`,
        {
          skill_id: parseInt(skillId),
          skill_name: skillName,
          questions: questions.map(question => ({
            id: question.id,
            question: question.question,
            user_answer: selectedAnswers[question.id] || ''
          }))
        },
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Clear saved answers after successful submission
      localStorage.removeItem(`test_answers_${skillId}`);

      const { results: testResults } = response.data.data;
      
      const resultsData = {
        skillName,
        totalQuestions: testResults.total_question,
        rightAnswers: testResults.right_answer,
        wrongAnswers: testResults.wrong_answer,
        percentage: testResults.Percentage,
        isAutoSubmit
      };
      
      localStorage.setItem('testResults', JSON.stringify(resultsData));
      
      setResults(testResults);
      setShowResults(true);
      setLoading(false);
    } catch (err) {
      console.error('Error submitting test:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit test');
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = async () => {
    setShowCancelConfirmation(false);
    await handleSubmitTest(true);
  };

  const handleCancelDialogClose = () => {
    setShowCancelConfirmation(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Please Wait
          </h2>
          <p className="text-gray-600">
            {isTimeUp ? 'Submitting your test...' : 'Loading your test questions...'}
          </p>
          <p className="text-sm text-red-500 mt-2">
            Please do not close or refresh the page
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Test Results for {skillName}</h2>
          {isTimeUp && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-center">
                Time's up! Test was automatically submitted.
              </p>
            </div>
          )}
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="font-semibold">Total Questions:</span>
              <span>{results.total_question}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
              <span className="font-semibold">Correct Answers:</span>
              <span className="text-green-600">{results.right_answer}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
              <span className="font-semibold">Wrong Answers:</span>
              <span className="text-red-600">{results.wrong_answer}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
              <span className="font-semibold">Score:</span>
              <span className="text-blue-600 font-bold">{Math.floor(results.Percentage)}%</span>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            <button
              onClick={() => navigate('/candidates-dashboard/dashboard')}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full ">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-700">No questions available</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 w-full transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6 ">
      <div className="max-w-3xl mx-auto ">
        {/* Timer Display */}
        <div className="bg-white rounded-lg shadow-lg p-3 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
           <Clock/>
            <span className="font-semibold text-gray-700">Time Remaining:</span>
          </div>
          <div className={`text-xl font-bold ${timeRemaining <= 60 ? 'text-red-500 animate-pulse' : 'text-blue-600'}`}>
            {formatTime(timeRemaining)}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <div className=' flex flex-col justify-center gap-2'>
              <h1 className="text-2xl font-bold">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h1>
              <span className="text-sm text-gray-500">
                Skill: {skillName}
              </span>
              </div>
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                disabled={isTimeUp}
              >
                <X />
              </button>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl mb-4 font-medium">
              {currentQuestion.question}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label 
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-colors
                    ${selectedAnswers[currentQuestion.id] === option
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:bg-gray-50'}
                    ${isTimeUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    checked={selectedAnswers[currentQuestion.id] === option}
                    onChange={() => handleAnswerSelect(currentQuestion.id, option)}
                    disabled={isTimeUp}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="flex-grow">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0 || isTimeUp}
              className={`px-6 py-2 rounded-lg transition-colors
                ${currentQuestionIndex === 0 || isTimeUp
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              ← Previous
            </button>
            {/* cancel button */}
            
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={() => handleSubmitTest(false)}
                disabled={isTimeUp}
                className={`px-6 py-2 rounded-lg transition-colors
                  ${isTimeUp
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'}`}
              >
                Submit Test
              </button>
            ) : (
             
              <button
                onClick={handleNext}
                disabled={isTimeUp}
                className={`px-6 py-2 rounded-lg transition-colors
                  ${isTimeUp
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'}`}
              >
                Next →
              </button>
            )}
          </div>

          {/* Question Navigation */}
          {/* <div className="mt-8 border-t pt-6">
            <h3 className="text-lg font-semibold mb-4">Question Navigator</h3>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-8 md:grid-cols-10">
              {questions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestionIndex(index)}
                  disabled={isTimeUp}
                  className={`p-2 rounded-lg text-sm font-medium transition-colors
                    ${currentQuestionIndex === index 
                      ? 'bg-blue-500 text-white' 
                      : question.user_answer 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    ${isTimeUp ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div> */}

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <ConfirmationDialog
        isOpen={showCancelConfirmation}
        onClose={handleCancelDialogClose}
        onConfirm={handleConfirmCancel}
        title="Cancel Test"
        message="Are you sure you want to cancel the test? This will submit your current answers and end the test immediately."
        confirmButtonText="Yes, Cancel Test"
        cancelButtonText="No, Continue Test"
        confirmButtonVariant="destructive"
      />
        </div>
      </div>
    </div>
  );
};

export default TestPaper;