import React, { useState } from 'react';
import { Calendar, Plus, Trash2, Edit2, BookOpen, Clock, AlertCircle, CheckCircle2, Save, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS } from '../constants';

interface ExamTopic {
  title: string;
  questionCount?: number;
  note?: string;
}

interface ExamSubject {
  id: string;
  courseName: string;
  examDate: string;
  examTime: string;
  topics: ExamTopic[];
  room?: string;
  notes?: string;
  status: 'upcoming' | 'today' | 'completed';
}

const ExamCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filterStatus, setFilterStatus] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [expandedExamId, setExpandedExamId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedExam, setSelectedExam] = useState<ExamSubject | null>(null);
  const [exams, setExams] = useState<ExamSubject[]>([
    {
      id: '1',
      courseName: 'Veri Yapıları',
      examDate: '2025-11-28',
      examTime: '09:00',
      topics: [
        { title: 'Ağaçlar', questionCount: 5, note: 'Binary Search Tree önemli' },
        { title: 'Graf Algoritmaları', questionCount: 4 },
        { title: 'Hash Tabloları', questionCount: 3, note: 'Collision handling sorulacak' },
        { title: 'Dinamik Programlama', questionCount: 3 }
      ],
      room: 'A-201',
      notes: 'Algoritma karmaşıklığı soruları önemli',
      status: 'upcoming'
    },
    {
      id: '2',
      courseName: 'Veritabanı Yönetimi',
      examDate: '2025-11-29',
      examTime: '13:00',
      topics: [
        { title: 'SQL Sorguları', questionCount: 6, note: 'JOIN işlemleri detaylı' },
        { title: 'Normalizasyon', questionCount: 4 },
        { title: 'İndeksleme', questionCount: 3 },
        { title: 'Transaction Yönetimi', questionCount: 2 }
      ],
      room: 'B-105',
      notes: 'ERD diyagramları çizilebilmeli',
      status: 'upcoming'
    },
    {
      id: '3',
      courseName: 'Web Programlama',
      examDate: '2025-12-02',
      examTime: '10:30',
      topics: [
        { title: 'React Hooks', questionCount: 5 },
        { title: 'State Management', questionCount: 4 },
        { title: 'RESTful API', questionCount: 3 },
        { title: 'Authentication', questionCount: 3 }
      ],
      room: 'C-301',
      status: 'upcoming'
    },
    {
      id: '4',
      courseName: 'Yapay Zeka',
      examDate: '2025-12-05',
      examTime: '14:00',
      topics: [
        { title: 'Makine Öğrenmesi', questionCount: 6 },
        { title: 'Sinir Ağları', questionCount: 5, note: 'Backpropagation mutlaka çalış' },
        { title: 'NLP', questionCount: 2 },
        { title: 'Computer Vision', questionCount: 2 }
      ],
      room: 'A-101',
      notes: 'Python kodu yazılabilir',
      status: 'upcoming'
    },
    {
      id: '5',
      courseName: 'Bilgisayar Ağları',
      examDate: '2025-12-05',
      examTime: '09:00',
      topics: [
        { title: 'TCP/IP Protokolleri', questionCount: 5 },
        { title: 'Routing', questionCount: 4 },
        { title: 'Network Security', questionCount: 3 },
        { title: 'OSI Modeli', questionCount: 3 }
      ],
      room: 'B-202',
      status: 'upcoming'
    },
    {
      id: '6',
      courseName: 'İşletim Sistemleri',
      examDate: '2025-12-10',
      examTime: '09:30',
      topics: [
        { title: 'Process Management', questionCount: 4 },
        { title: 'Memory Management', questionCount: 4 },
        { title: 'File Systems', questionCount: 3 },
        { title: 'Deadlock', questionCount: 4, note: 'Banker algoritması önemli' }
      ],
      room: 'A-305',
      notes: 'Pratik sorular çözülmeli',
      status: 'upcoming'
    },
    {
      id: '7',
      courseName: 'Algoritma Analizi',
      examDate: '2025-11-25',
      examTime: '10:00',
      topics: [
        { title: 'Sıralama Algoritmaları', questionCount: 5 },
        { title: 'Arama Algoritmaları', questionCount: 4 },
        { title: 'Greedy Algorithms', questionCount: 6 }
      ],
      room: 'C-101',
      status: 'completed'
    },
    {
      id: '8',
      courseName: 'Mobil Programlama',
      examDate: '2025-12-12',
      examTime: '15:00',
      topics: [
        { title: 'React Native', questionCount: 6 },
        { title: 'State Management', questionCount: 4 },
        { title: 'Navigation', questionCount: 3 },
        { title: 'API Integration', questionCount: 2 }
      ],
      room: 'B-303',
      status: 'upcoming'
    },
    {
      id: '9',
      courseName: 'Nesne Yönelimli Programlama',
      examDate: '2025-11-28',
      examTime: '14:00',
      topics: [
        { title: 'Kalıtım', questionCount: 4 },
        { title: 'Polimorfizm', questionCount: 4 },
        { title: 'Soyutlama', questionCount: 3 },
        { title: 'Encapsulation', questionCount: 2 },
        { title: 'Design Patterns', questionCount: 2, note: 'Factory ve Singleton önemli' }
      ],
      room: 'A-105',
      notes: 'UML diyagramları sorulacak',
      status: 'upcoming'
    },
    {
      id: '10',
      courseName: 'Yazılım Mühendisliği',
      examDate: '2025-12-02',
      examTime: '14:30',
      topics: [
        { title: 'SDLC', questionCount: 4 },
        { title: 'Agile Metodolojileri', questionCount: 5 },
        { title: 'Test Stratejileri', questionCount: 4 },
        { title: 'Version Control', questionCount: 2 }
      ],
      room: 'B-201',
      status: 'upcoming'
    },
  ]);

  const [isAddingExam, setIsAddingExam] = useState(false);
  const [editingExamId, setEditingExamId] = useState<string | null>(null);
  const [newExam, setNewExam] = useState<Partial<ExamSubject>>({
    courseName: '',
    examDate: '',
    examTime: '',
    topics: [],
    room: '',
    notes: '',
    status: 'upcoming'
  });
  const [newTopic, setNewTopic] = useState<ExamTopic>({
    title: '',
    questionCount: undefined,
    note: ''
  });

  const handleAddExam = () => {
    if (newExam.courseName && newExam.examDate && newExam.examTime) {
      const exam: ExamSubject = {
        id: Date.now().toString(),
        courseName: newExam.courseName,
        examDate: newExam.examDate,
        examTime: newExam.examTime,
        topics: newExam.topics || [],
        room: newExam.room || '',
        notes: newExam.notes || '',
        status: 'upcoming'
      };
      setExams([...exams, exam]);
      setNewExam({
        courseName: '',
        examDate: '',
        examTime: '',
        topics: [],
        room: '',
        notes: '',
        status: 'upcoming'
      });
      setIsAddingExam(false);
    }
  };

  const handleDeleteExam = (id: string) => {
    setExams(exams.filter(exam => exam.id !== id));
  };

  const handleAddTopic = () => {
    if (newTopic.title.trim()) {
      const topicToAdd: ExamTopic = {
        title: newTopic.title.trim(),
        questionCount: newTopic.questionCount,
        note: newTopic.note?.trim() || undefined
      };
      setNewExam({
        ...newExam,
        topics: [...(newExam.topics || []), topicToAdd]
      });
      setNewTopic({ title: '', questionCount: undefined, note: '' });
    }
  };

  const handleRemoveTopic = (index: number) => {
    const updatedTopics = [...(newExam.topics || [])];
    updatedTopics.splice(index, 1);
    setNewExam({ ...newExam, topics: updatedTopics });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'today': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getDaysUntilExam = (examDate: string) => {
    const today = new Date();
    const exam = new Date(examDate);
    const diffTime = exam.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const sortedExams = [...exams].sort((a, b) => 
    new Date(a.examDate).getTime() - new Date(b.examDate).getTime()
  );

  const filteredExams = filterStatus === 'all' 
    ? sortedExams 
    : sortedExams.filter(exam => exam.status === filterStatus);

  const toggleExamExpansion = (examId: string) => {
    setExpandedExamId(expandedExamId === examId ? null : examId);
  };

  const handleDateClick = (date: Date) => {
    const examsOnDate = getExamsForDate(date);
    if (examsOnDate.length > 0) {
      setSelectedDate(date);
    }
  };

  const handleAddExamForDate = (date: Date, e: React.MouseEvent) => {
    e.stopPropagation();
    const dateString = date.toISOString().split('T')[0];
    setNewExam({
      ...newExam,
      examDate: dateString,
      courseName: '',
      examTime: '',
      topics: [],
      room: '',
      notes: '',
      status: 'upcoming'
    });
    setIsAddingExam(true);
  };

  const handleExamClick = (exam: ExamSubject) => {
    setSelectedExam(exam);
  };

  const closeModals = () => {
    setSelectedDate(null);
    setSelectedExam(null);
  };

  const closeExamDetailOnly = () => {
    setSelectedExam(null);
  };

  // Calendar functions
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const getExamsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return exams.filter(exam => exam.examDate === dateStr);
  };

  const getDateColor = (date: Date) => {
    const examsOnDate = getExamsForDate(date);
    if (examsOnDate.length === 0) return '';

    const daysUntil = getDaysUntilExam(date.toISOString().split('T')[0]);
    
    if (daysUntil === 0) return 'bg-orange-500 text-white hover:bg-orange-600';
    if (daysUntil <= 3) return 'bg-red-500 text-white hover:bg-red-600';
    if (daysUntil <= 7) return 'bg-yellow-400 text-gray-800 hover:bg-yellow-500';
    return 'bg-[#00BFA5] text-white hover:bg-[#00a590]';
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];
    const dayNames = ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'];

    // Adjust for Monday start (Turkish calendar)
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

    // Empty cells for days before month starts
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="aspect-square p-1"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const examsOnDate = getExamsForDate(date);
      const dateColor = getDateColor(date);
      const isTodayDate = isToday(date);

      days.push(
        <div
          key={day}
          className={`min-h-20 p-2 transition-all border border-gray-200 relative group ${
            dateColor ? 'hover:shadow-md cursor-pointer' : 'bg-white'
          } ${
            isTodayDate ? 'ring-2 ring-[#00BFA5]' : ''
          } ${dateColor || 'bg-white'}`}
        >
          <button
            onClick={() => handleDateClick(date)}
            className="w-full h-full text-left"
          >
            <div className="w-full h-full flex flex-col items-start">
              <span className={`text-sm font-semibold mb-1 ${!dateColor ? 'text-gray-700' : 'text-white'}`}>
                {day}
              </span>
              {examsOnDate.length > 0 && (
                <div className="w-full space-y-1">
                  {examsOnDate.map((exam, idx) => (
                    <div
                      key={idx}
                      className="text-[10px] font-medium bg-white bg-opacity-90 text-gray-800 px-1.5 py-0.5 rounded truncate w-full text-left"
                      title={exam.courseName}
                    >
                      {exam.courseName}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </button>
          
          {/* Add button - appears on hover */}
          <button
            onClick={(e) => handleAddExamForDate(date, e)}
            className="absolute top-1 right-1 p-1 bg-[#00BFA5] hover:bg-[#00a590] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            title="Bu güne sınav ekle"
          >
            <Plus size={12} />
          </button>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-800">
            {currentMonth.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={previousMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft size={14} className="text-gray-600" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight size={14} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* Day names */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map(name => (
            <div key={name} className="text-center text-xs font-semibold text-gray-600 py-1 bg-gray-50 rounded">
              {name}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-2 justify-center">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-red-500"></div>
              <span className="text-[10px] text-gray-600">≤3 gün</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-yellow-400"></div>
              <span className="text-[10px] text-gray-600">4-7 gün</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-[#00BFA5]"></div>
              <span className="text-[10px] text-gray-600">&gt;7 gün</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded bg-orange-500"></div>
              <span className="text-[10px] text-gray-600">Bugün</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Add Exam Modal */}
      {isAddingExam && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setIsAddingExam(false)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-gray-900">Yeni Sınav Ekle</h3>
                  <p className="text-sm text-gray-600">Sınav detaylarını girin ve konuları ekleyin</p>
                </div>
                <button
                  onClick={() => setIsAddingExam(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X size={22} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Ders Adı <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newExam.courseName || ''}
                    onChange={(e) => setNewExam({ ...newExam, courseName: e.target.value })}
                    placeholder="Örn: Veri Yapıları ve Algoritmalar"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sınav Tarihi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newExam.examDate || ''}
                    onChange={(e) => setNewExam({ ...newExam, examDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sınav Saati <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={newExam.examTime || ''}
                    onChange={(e) => setNewExam({ ...newExam, examTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Oda/Salon</label>
                  <input
                    type="text"
                    value={newExam.room || ''}
                    onChange={(e) => setNewExam({ ...newExam, room: e.target.value })}
                    placeholder="Örn: A-101"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Durum <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={newExam.status || 'upcoming'}
                    onChange={(e) => setNewExam({ ...newExam, status: e.target.value as 'upcoming' | 'completed' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all bg-white"
                  >
                    <option value="upcoming">Yaklaşan</option>
                    <option value="completed">Tamamlandı</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Notlar</label>
                  <textarea
                    value={newExam.notes || ''}
                    onChange={(e) => setNewExam({ ...newExam, notes: e.target.value })}
                    placeholder="Sınav ile ilgili önemli notlar..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all resize-none"
                  />
                </div>
              </div>

              {/* Topics Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-semibold text-gray-700">Sınav Konuları</label>
                  <span className="text-xs text-gray-500">{newExam.topics?.length || 0} konu</span>
                </div>

                {newExam.topics && newExam.topics.length > 0 && (
                  <div className="space-y-2 mb-3">
                    {newExam.topics.map((topic, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="shrink-0 w-6 h-6 bg-[#00BFA5] bg-opacity-20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-[#00BFA5]">{index + 1}</span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-800 font-medium">{topic.title}</p>
                          <div className="flex items-center gap-3 mt-1">
                            {topic.questionCount && (
                              <span className="text-xs text-gray-600 bg-blue-100 px-2 py-0.5 rounded">
                                {topic.questionCount} soru
                              </span>
                            )}
                            {topic.note && (
                              <span className="text-xs text-gray-600 italic">"{topic.note}"</span>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const updatedTopics = newExam.topics?.filter((_, i) => i !== index) || [];
                            setNewExam({ ...newExam, topics: updatedTopics });
                          }}
                          className="shrink-0 p-1 hover:bg-red-100 rounded transition-colors"
                        >
                          <X size={14} className="text-red-500" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTopic.title}
                      onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTopic();
                        }
                      }}
                      placeholder="Konu başlığı..."
                      className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                    />
                    <input
                      type="number"
                      value={newTopic.questionCount || ''}
                      onChange={(e) => setNewTopic({ ...newTopic, questionCount: e.target.value ? parseInt(e.target.value) : undefined })}
                      placeholder="Soru sayısı"
                      className="w-28 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                      min="1"
                    />
                    <input
                      type="text"
                      value={newTopic.note || ''}
                      onChange={(e) => setNewTopic({ ...newTopic, note: e.target.value })}
                      placeholder="Not..."
                      className="w-48 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00BFA5] focus:border-transparent transition-all"
                    />
                    <button
                      onClick={handleAddTopic}
                      className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium flex items-center gap-2 shrink-0"
                    >
                      <Plus size={18} />
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => setIsAddingExam(false)}
                  className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors font-medium"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddExam}
                  disabled={!newExam.courseName || !newExam.examDate || !newExam.examTime}
                  className="flex-1 px-6 py-3 bg-[#00BFA5] hover:bg-[#00a590] text-white rounded-xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <CheckCircle2 size={20} />
                  Sınavı Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {/* Date Modal - Shows exams for selected date */}
      {selectedDate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={closeModals}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden flex" onClick={(e) => e.stopPropagation()}>
            {/* Left side - Exam list */}
            <div className={`${selectedExam ? 'w-2/5' : 'w-full'} border-r border-gray-200 flex flex-col transition-all`}>
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {selectedDate.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {getExamsForDate(selectedDate).length} sınav
                    </p>
                  </div>
                  <button
                    onClick={closeModals}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
              </div>
              <div className="p-6 space-y-3 overflow-y-auto flex-1">
                {getExamsForDate(selectedDate).map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => handleExamClick(exam)}
                    className={`w-full text-left p-4 rounded-xl transition-all border ${
                      selectedExam?.id === exam.id
                        ? 'bg-[#00BFA5] bg-opacity-10 border-[#00BFA5]'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 mb-1">{exam.courseName}</h4>
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{exam.examTime}</span>
                          </div>
                          {exam.room && (
                            <div className="flex items-center gap-1">
                              <BookOpen size={14} />
                              <span>{exam.room}</span>
                            </div>
                          )}
                        </div>
                        {exam.topics.length > 0 && (
                          <p className="text-xs text-[#00BFA5] mt-2">{exam.topics.length} konu</p>
                        )}
                      </div>
                      {selectedExam?.id !== exam.id && (
                        <ChevronRight size={18} className="text-gray-400 mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right side - Exam details */}
            {selectedExam && (
              <div className="w-3/5 flex flex-col">
                <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{selectedExam.courseName}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} />
                          <span>
                            {new Date(selectedExam.examDate).toLocaleDateString('tr-TR', { 
                              day: 'numeric', 
                              month: 'long', 
                              year: 'numeric' 
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} />
                          <span>{selectedExam.examTime}</span>
                        </div>
                        {selectedExam.room && (
                          <div className="flex items-center gap-1.5">
                            <BookOpen size={16} />
                            <span>{selectedExam.room}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={closeExamDetailOnly}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
                    >
                      <X size={22} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto flex-1">
                  {selectedExam.topics.length > 0 ? (
                    <div>
                      <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <BookOpen size={20} className="text-[#00BFA5]" />
                        Vize Konuları ({selectedExam.topics.length})
                      </h4>
                      <div className="space-y-3">
                        {selectedExam.topics.map((topic, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 bg-linear-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:border-[#00BFA5] transition-colors"
                          >
                            <div className="shrink-0 w-8 h-8 bg-[#00BFA5] bg-opacity-20 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-[#00BFA5]">{index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-gray-800 font-semibold leading-relaxed mb-2">{topic.title}</p>
                              <div className="flex items-center gap-3">
                                {topic.questionCount && (
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                                    {topic.questionCount} soru
                                  </span>
                                )}
                                {topic.note && (
                                  <span className="text-xs text-gray-600 italic">"{topic.note}"</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen size={48} className="mx-auto mb-3 text-gray-300" />
                      <p className="text-gray-500">Henüz konu eklenmemiş</p>
                    </div>
                  )}

                  {selectedExam.notes && (
                    <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg p-4">
                      <div className="flex gap-3">
                        <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-800 mb-1">Not</p>
                          <p className="text-sm text-gray-700 leading-relaxed">{selectedExam.notes}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Exam Detail Modal - Removed, now integrated into date modal */}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#00BFA5] bg-opacity-10 rounded-xl">
                <Calendar size={28} color={COLORS.turquoise} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Vize Takvimi</h1>
                <p className="text-sm text-gray-500">Sınav programınızı yönetin ve konularınızı takip edin</p>
              </div>
            </div>
            <button
              onClick={() => setIsAddingExam(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#00BFA5] text-white rounded-xl hover:bg-[#00a590] transition-colors font-medium"
            >
              <Plus size={20} />
              Sınav Ekle
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Calendar and Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Column */}
          <div className="lg:col-span-1 space-y-4">
            {/* Toplam Sınav Card */}
            <div>
              <button
                onClick={() => setFilterStatus(filterStatus === 'all' ? '' as any : 'all')}
                className={`w-full bg-white rounded-xl p-5 border-2 shadow-sm text-left transition-all hover:shadow-md ${
                  filterStatus === 'all' ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-blue-100 rounded-lg">
                    <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">{exams.length}</p>
                </div>
                <p className="text-sm text-gray-600 font-medium">Toplam Sınav</p>
              </button>
              
              {filterStatus === 'all' && exams.length > 0 && (
                <div className="mt-2 bg-white rounded-xl border-2 border-blue-200 shadow-sm overflow-hidden animate-slideDown">
                  <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    {exams.slice().sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()).map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3 bg-blue-50 rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedExam(exam);
                          const examDate = new Date(exam.examDate);
                          setSelectedDate(examDate);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 text-sm mb-1">{exam.courseName}</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar size={12} />
                              <span>{new Date(exam.examDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                              <Clock size={12} />
                              <span>{exam.examTime}</span>
                            </div>
                          </div>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            exam.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {exam.status === 'completed' ? 'Tamamlandı' : 'Yaklaşan'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Yaklaşan Sınav Card */}
            <div>
              <button
                onClick={() => setFilterStatus(filterStatus === 'upcoming' ? '' as any : 'upcoming')}
                className={`w-full bg-white rounded-xl p-5 border-2 shadow-sm text-left transition-all hover:shadow-md ${
                  filterStatus === 'upcoming' ? 'border-orange-500 ring-2 ring-orange-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-orange-100 rounded-lg">
                    <AlertCircle size={20} className="text-orange-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {exams.filter(e => e.status === 'upcoming').length}
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-medium">Yaklaşan Sınav</p>
              </button>
              
              {filterStatus === 'upcoming' && exams.filter(e => e.status === 'upcoming').length > 0 && (
                <div className="mt-2 bg-white rounded-xl border-2 border-orange-200 shadow-sm overflow-hidden animate-slideDown">
                  <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    {exams.filter(e => e.status === 'upcoming').sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime()).map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3 bg-orange-50 rounded-lg border border-orange-100 hover:bg-orange-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedExam(exam);
                          const examDate = new Date(exam.examDate);
                          setSelectedDate(examDate);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 text-sm mb-1">{exam.courseName}</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar size={12} />
                              <span>{new Date(exam.examDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                              <Clock size={12} />
                              <span>{exam.examTime}</span>
                            </div>
                          </div>
                          {getDaysUntilExam(exam.examDate) <= 3 && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded text-xs font-medium">
                              Acil!
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tamamlanan Sınav Card */}
            <div>
              <button
                onClick={() => setFilterStatus(filterStatus === 'completed' ? '' as any : 'completed')}
                className={`w-full bg-white rounded-xl p-5 border-2 shadow-sm text-left transition-all hover:shadow-md ${
                  filterStatus === 'completed' ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-green-100 rounded-lg">
                    <CheckCircle2 size={20} className="text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800">
                    {exams.filter(e => e.status === 'completed').length}
                  </p>
                </div>
                <p className="text-sm text-gray-600 font-medium">Tamamlanan</p>
              </button>
              
              {filterStatus === 'completed' && exams.filter(e => e.status === 'completed').length > 0 && (
                <div className="mt-2 bg-white rounded-xl border-2 border-green-200 shadow-sm overflow-hidden animate-slideDown">
                  <div className="p-4 space-y-2 max-h-96 overflow-y-auto">
                    {exams.filter(e => e.status === 'completed').sort((a, b) => new Date(b.examDate).getTime() - new Date(a.examDate).getTime()).map((exam) => (
                      <div
                        key={exam.id}
                        className="p-3 bg-green-50 rounded-lg border border-green-100 hover:bg-green-100 transition-colors cursor-pointer"
                        onClick={() => {
                          setSelectedExam(exam);
                          const examDate = new Date(exam.examDate);
                          setSelectedDate(examDate);
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-semibold text-gray-800 text-sm mb-1">{exam.courseName}</h5>
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Calendar size={12} />
                              <span>{new Date(exam.examDate).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                              <Clock size={12} />
                              <span>{exam.examTime}</span>
                            </div>
                          </div>
                          <CheckCircle2 size={16} className="text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Calendar Column */}
          <div className="lg:col-span-2">
            {renderCalendar()}
          </div>
        </div>

        {/* Exams List */}
        <div className="space-y-4">
          {filterStatus !== 'all' && (
            <div className="flex items-center justify-between bg-[#00BFA5] bg-opacity-10 rounded-xl p-4 border border-[#00BFA5] border-opacity-30">
              <p className="text-sm font-medium text-gray-700">
                {filterStatus === 'upcoming' && `${filteredExams.length} yaklaşan sınav gösteriliyor`}
                {filterStatus === 'completed' && `${filteredExams.length} tamamlanmış sınav gösteriliyor`}
              </p>
              <button
                onClick={() => setFilterStatus('all')}
                className="text-sm font-medium text-[#00BFA5] hover:underline"
              >
                Tümünü Göster
              </button>
            </div>
          )}

          {filteredExams.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
              <Calendar size={48} className="mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                {filterStatus === 'all' && 'Henüz sınav eklenmemiş'}
                {filterStatus === 'upcoming' && 'Yaklaşan sınav bulunmuyor'}
                {filterStatus === 'completed' && 'Tamamlanmış sınav bulunmuyor'}
              </h3>
              <p className="text-gray-500 mb-4">
                {filterStatus === 'all' && 'Vize takvimini oluşturmak için yukarıdaki butona tıklayın'}
                {filterStatus !== 'all' && 'Farklı bir filtre seçmeyi deneyin'}
              </p>
            </div>
          ) : (
            filteredExams.map((exam) => {
              const daysUntil = getDaysUntilExam(exam.examDate);
              const examDateObj = new Date(exam.examDate);
              const formattedDate = examDateObj.toLocaleDateString('tr-TR', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              });

              return (
                <div
                  key={exam.id}
                  className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleExamExpansion(exam.id)}
                    className="w-full p-6 text-left"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-800">{exam.courseName}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(exam.status)}`}>
                            {daysUntil > 0 ? `${daysUntil} gün kaldı` : daysUntil === 0 ? 'Bugün' : 'Geçti'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1.5">
                            <Calendar size={16} />
                            <span>{formattedDate}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock size={16} />
                            <span>{exam.examTime}</span>
                          </div>
                          {exam.room && (
                            <div className="flex items-center gap-1.5">
                              <BookOpen size={16} />
                              <span>{exam.room}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExam(exam.id);
                          }}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                        >
                          <Trash2 size={18} className="text-gray-400 group-hover:text-red-500" />
                        </button>
                      </div>
                    </div>

                    {exam.topics.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <BookOpen size={16} />
                        <span>{exam.topics.length} konu</span>
                        <span className="text-gray-300">•</span>
                        <span className="text-[#00BFA5]">
                          {expandedExamId === exam.id ? 'Gizle' : 'Detayları Göster'}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Expanded Topics Section */}
                  {expandedExamId === exam.id && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4">
                      {exam.topics.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <BookOpen size={16} className="text-[#00BFA5]" />
                            Vize Konuları
                          </h4>
                          <div className="space-y-2">
                            {exam.topics.map((topic, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                <div className="shrink-0 w-6 h-6 bg-[#00BFA5] bg-opacity-20 rounded-full flex items-center justify-center mt-0.5">
                                  <span className="text-xs font-bold text-[#00BFA5]">{index + 1}</span>
                                </div>
                                <span className="text-sm text-gray-700 font-medium flex-1">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exam.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                          <p className="text-sm text-gray-700">
                            <span className="font-semibold text-gray-800">Not: </span>
                            {exam.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;
