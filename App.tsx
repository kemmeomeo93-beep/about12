import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Check, X, User, Lock, Calendar, BookOpen, Clock, Heart, 
  MessageSquare, Send, Image, FileText, Plus, ShoppingBag, Sparkles, 
  Award, Search, Settings, LogOut, CheckSquare, Edit3, Trash2, 
  Volume2, Eye, EyeOff, UserPlus, Users, MessageCircle, AlertCircle,
  Maximize2, Minimize2, Bookmark, Share2, HelpCircle, RefreshCw,
  Gift, Crown, Zap, Compass, Grid, Filter, Menu, ChevronRight, ChevronDown,
  Smile, ThumbsUp, Star, Music, RotateCw, CheckCircle2, DollarSign,
  ChevronLeft, Layers, MapPin, Tag, Briefcase, Hash, Bell
} from 'lucide-react';

// --- INITIAL STATE / SEED DATA ---
const INITIAL_USERS = [
  {
    id: 'u_nkabt',
    username: 'nkabt',
    displayName: 'Nguyễn Khánh (Alpha)',
    realName: 'Nguyễn Khánh',
    dob: '2006-05-12',
    classRoom: '12B',
    role: 'alpha', // alpha (Chủ quản α), teacher, monitor, vice_monitor, student
    spaces: ['12B', 'JQK'],
    status: 'approved',
    isTeacher: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Chủ quản hệ thống about12b 🍀 | Lớp trưởng 12B k24',
    futureJob: 'Kỹ sư CNTT / AI Engineer',
    coins: 450,
    equippedFrame: 'frame_gold',
    equippedBadge: '🍀 Cỏ 4 Lá',
    equippedNameTag: '⚡ Admin α',
    inventory: ['frame_gold', 'frame_tech', 'badge_clover', 'tag_alpha']
  },
  {
    id: 'u_teacher1',
    username: 'coha12b',
    displayName: 'Cô Thu Hà 🟡',
    realName: 'Trần Thu Hà',
    dob: '1985-11-20',
    classRoom: '12B',
    role: 'teacher',
    spaces: ['12B', 'JQK'],
    status: 'approved',
    isTeacher: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    bio: 'GVCN Lớp 12B - Chúc các em thi THPT Quốc Gia đạt điểm cao nhất! 🍀',
    futureJob: 'Giáo viên Chủ nhiệm',
    coins: 1000,
    equippedFrame: 'frame_emerald',
    equippedBadge: '👩‍🏫 GVCN',
    equippedNameTag: '🟡 GVCN 12B',
    inventory: ['frame_emerald']
  },
  {
    id: 'u_bao',
    username: 'baopro',
    displayName: 'Gia Bảo',
    realName: 'Lê Gia Bảo',
    dob: '2006-08-15',
    classRoom: '12B',
    role: 'monitor',
    spaces: ['12B', 'JQK'],
    status: 'approved',
    isTeacher: false,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    bio: 'Lớp trưởng 12B - Yêu Liên Quân, đam mê Toán Lý',
    futureJob: 'Bác sĩ Đa khoa',
    coins: 180,
    equippedFrame: 'frame_blue',
    equippedBadge: '👑 Lớp Trưởng',
    equippedNameTag: '🎮 Pro Gamer',
    inventory: ['frame_blue']
  },
  {
    id: 'u_lan',
    username: 'lananh',
    displayName: 'Lan Anh 🍀',
    realName: 'Nguyễn Lan Anh',
    dob: '2006-03-04',
    classRoom: '12B',
    role: 'student',
    spaces: ['12B'],
    status: 'approved',
    isTeacher: false,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    bio: 'Thành viên 12B - Thích vẽ tranh & nghe nhạc Stardew Valley',
    futureJob: 'Nhà Thiết Kế Đồ Họa',
    coins: 90,
    equippedFrame: '',
    equippedBadge: '🍀 Cỏ 4 Lá',
    equippedNameTag: '',
    inventory: []
  },
  {
    id: 'u_pending1',
    username: 'minhtu',
    displayName: 'Minh Tú JQK',
    realName: 'Hoàng Minh Tú',
    dob: '2006-10-02',
    classRoom: '12A1',
    role: 'student',
    spaces: ['JQK'],
    status: 'pending',
    isTeacher: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Học sinh 12A1 tham gia cộng đồng JQK',
    futureJob: 'Kiến trúc sư',
    coins: 0,
    equippedFrame: '',
    equippedBadge: '',
    equippedNameTag: '',
    inventory: []
  }
];

const INITIAL_SCHEDULE = [
  { day: 'Thứ 2', subjects: ['Chào cờ', 'Toán Đại', 'Toán Hình', 'Ngữ Văn', 'Hóa Học'] },
  { day: 'Thứ 3', subjects: ['Vật Lý', 'Vật Lý', 'Tiếng Anh', 'Sinh Học', 'Tin Học'] },
  { day: 'Thứ 4', subjects: ['Ngữ Văn', 'Ngữ Văn', 'Toán Đại', 'Lịch Sử', 'GDCD'] },
  { day: 'Thứ 5', subjects: ['Hóa Học', 'Tiếng Anh', 'Tiếng Anh', 'Thể Dục', 'Thể Dục'] },
  { day: 'Thứ 6', subjects: ['Toán Hình', 'Vật Lý', 'Địa Lý', 'Công Nghệ', 'Sinh Hoạt'] },
  { day: 'Thứ 7', subjects: ['Ôn thi THPT Toán', 'Ôn thi THPT Văn', 'Ôn thi Anh', 'CLB Sáng tạo'] },
  { day: 'Chủ Nhật', subjects: ['Nghỉ ngơi 🍀', 'Học nhóm Online', 'Tự học'] },
];

const INITIAL_PASSPORT_NOTES = [
  {
    id: 'p_1',
    studentId: 'u_nkabt',
    studentName: 'Nguyễn Khánh',
    teacherName: 'Cô Thu Hà 🟡',
    teacherId: 'u_teacher1',
    content: 'Em Khánh luôn năng nổ, có trách nhiệm cao với các hoạt động của lớp 12B. Cố gắng phát huy phong độ môn Toán nhé!',
    stampPos: { x: 65, y: 35, rotate: -12 },
    date: '2026-10-15'
  },
  {
    id: 'p_2',
    studentId: 'u_bao',
    studentName: 'Gia Bảo',
    teacherName: 'Cô Thu Hà 🟡',
    teacherId: 'u_teacher1',
    content: 'Gia Bảo chấp hành tốt nội quy lớp, quản lý các bạn chu đáo. Chúc em đỗ NV1 Đại học Y Dược!',
    stampPos: { x: 70, y: 40, rotate: 8 },
    date: '2026-10-20'
  }
];

const INITIAL_DOCUMENTS = [
  {
    id: 'doc_1',
    title: 'Đề thi thử THPT QG 2026 Môn Toán - Có đáp án chi tiết',
    uploader: 'Nguyễn Khánh (Alpha)',
    uploaderId: 'u_nkabt',
    category: 'Toán Học',
    link: 'https://drive.google.com/sample-math-12b',
    date: '2026-10-25',
    downloads: 34
  },
  {
    id: 'doc_2',
    title: 'Sơ đồ tư duy 12 Tác phẩm Văn học Lớp 12 trọng tâm',
    uploader: 'Lan Anh 🍀',
    uploaderId: 'u_lan',
    category: 'Ngữ Văn',
    link: 'https://drive.google.com/sample-van-12b',
    date: '2026-10-22',
    downloads: 58
  }
];

const INITIAL_JQK_POSTS = [
  {
    id: 'post_1',
    authorId: 'u_nkabt',
    authorName: 'Nguyễn Khánh (Alpha)',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    content: 'Chào mừng tất cả các bạn đến với không gian cộng đồng JQK của about12b! 🍀 Đừng quên check-in nhận xu 🧬 hằng ngày nhé!',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
    likes: 18,
    likedBy: ['u_bao', 'u_lan'],
    comments: [
      { id: 'c1', author: 'Gia Bảo', text: 'Web xịn quá Alpha ơi 🍀🔥' },
      { id: 'c2', author: 'Lan Anh 🍀', text: 'Màu xanh dịu mắt thích cực!' }
    ],
    time: '2 giờ trước'
  },
  {
    id: 'post_2',
    authorId: 'u_bao',
    authorName: 'Gia Bảo',
    authorAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    content: 'Tối nay 8h30 phòng chat Liên Quân có ai leo cao thủ cùng không nào? Thiếu 2 tay đi Rừng và Đường Giữa!',
    image: null,
    likes: 7,
    likedBy: [],
    comments: [],
    time: '4 giờ trước'
  }
];

const INITIAL_ANON_LETTERS = [
  {
    id: 'letter_1',
    publicCode: '#123456',
    title: 'Gửi bạn bàn cuối tổ 2 🍀',
    recipient: 'Bạn nữ tổ 2',
    content: 'Cảm ơn cậu hôm thứ 3 vừa rồi đã cho tớ mượn máy tính Casio nhé. Chúc cậu kỳ thi sắp tới đạt kết quả thật cao!',
    readCount: 14,
    likes: 9,
    date: '2026-10-27',
    comments: [{ id: 'lc1', text: 'Dễ thương quá nè 🍀' }]
  },
  {
    id: 'letter_2',
    publicCode: '#889911',
    title: 'Lời cảm ơn gửi GVCN 12B',
    recipient: 'Cô Thu Hà 🟡',
    content: 'Cảm ơn cô vì lúc nào cũng tận tụy và bao dung cho tập thể 12B nghịch ngợm. Tụi con nhất định sẽ làm cô tự hào!',
    readCount: 29,
    likes: 22,
    date: '2026-10-26',
    comments: []
  }
];

const SHOP_ITEMS = [
  { id: 'frame_gold', name: 'Khung Hoàng Kim VIP', type: 'frame', price: 270, preview: 'border-4 border-yellow-400 shadow-yellow-200' },
  { id: 'frame_tech', name: 'Khung IT Technologist', type: 'frame', price: 300, preview: 'border-4 border-cyan-400 shadow-cyan-300' },
  { id: 'frame_emerald', name: 'Khung Lục Bảo 🍀', type: 'frame', price: 280, preview: 'border-4 border-emerald-500' },
  { id: 'badge_clover', name: 'Huy hiệu 🍀 Lucky', type: 'badge', price: 50, symbol: '🍀 Lucky 4-Leaf' },
  { id: 'badge_pro', name: 'Huy hiệu ⚡ Sắp Thi Đại Học', type: 'badge', price: 80, symbol: '⚡ Thi ĐH 2026' },
  { id: 'tag_alpha', name: 'Thẻ tên 🌟 VIP Member', type: 'nametag', price: 100, text: '🌟 VIP Member' },
  { id: 'job_doctor', name: 'Nghề Tương Lai: Bác Sĩ 🩺', type: 'frame', price: 290, preview: 'border-4 border-blue-400' },
  { id: 'job_engineer', name: 'Nghề Tương Lai: Kỹ Sư 💻', type: 'frame', price: 290, preview: 'border-4 border-teal-400' }
];

export default function App() {
  // State definitions with simulated persistence in LocalStorage
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('about12b_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('about12b_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // Default logged as Alpha
  });

  const [activeSpace, setActiveSpace] = useState('12B'); // '12B' or 'JQK'
  const [activeTab, setActiveTab] = useState('whiteboard'); // Sub tabs

  // 12B States
  const [passportNotes, setPassportNotes] = useState(() => {
    const saved = localStorage.getItem('about12b_passports');
    return saved ? JSON.parse(saved) : INITIAL_PASSPORT_NOTES;
  });
  const [documents, setDocuments] = useState(() => {
    const saved = localStorage.getItem('about12b_docs');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  // JQK States
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('about12b_posts');
    return saved ? JSON.parse(saved) : INITIAL_JQK_POSTS;
  });
  const [anonLetters, setAnonLetters] = useState(() => {
    const saved = localStorage.getItem('about12b_anon');
    return saved ? JSON.parse(saved) : INITIAL_ANON_LETTERS;
  });
  const [chatRoom, setChatRoom] = useState('Tổng');
  const [messages, setMessages] = useState({
    'Tổng': [
      { id: 'm1', sender: 'Nguyễn Khánh (Alpha)', text: 'Xin chào mọi người! Chúc một ngày học tập vui vẻ 🍀', time: '08:30' },
      { id: 'm2', sender: 'Lan Anh 🍀', text: 'Chào Alpha và cả lớp nè!', time: '08:32' }
    ],
    'Học tập': [{ id: 'm3', sender: 'Gia Bảo', text: 'Ai có lời giải bài 4 đề Toán hôm qua cho tớ xin với', time: '09:10' }],
    'Liên Quân': [{ id: 'm4', sender: 'Gia Bảo', text: 'Tối nay chiến game nhé ae!', time: '10:00' }]
  });

  // Shared / System States
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('about12b_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('about12b_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('about12b_passports', JSON.stringify(passportNotes));
  }, [passportNotes]);

  useEffect(() => {
    localStorage.setItem('about12b_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('about12b_anon', JSON.stringify(anonLetters));
  }, [anonLetters]);

  // Helper notification trigger
  const showToast = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // Daily Checkin Streak Logic (Coin reward)
  const handleDailyCheckin = () => {
    if (!currentUser) return;
    const today = new Date().toISOString().split('T')[0];
    const lastCheck = currentUser.lastCheckinDate;

    if (lastCheck === today) {
      showToast('Bạn đã điểm danh nhận xu hôm nay rồi! Hãy quay lại vào ngày mai 🍀', 'warning');
      return;
    }

    let currentStreak = currentUser.streak || 0;
    if (lastCheck) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastCheck === yesterday) {
        currentStreak = (currentStreak % 7) + 1;
      } else {
        currentStreak = 1;
      }
    } else {
      currentStreak = 1;
    }

    const rewardCoins = currentStreak * 10; // Day 1 = 10, Day 7 = 70
    const updatedUser = {
      ...currentUser,
      coins: (currentUser.coins || 0) + rewardCoins,
      lastCheckinDate: today,
      streak: currentStreak
    };

    setCurrentUser(updatedUser);
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    showToast(`🎉 Điểm danh Ngày ${currentStreak}! Bạn nhận được +${rewardCoins} 🧬 xu!`);
  };

  // Workspace visibility security check
  const canAccess12B = currentUser && currentUser.spaces.includes('12B');
  const canAccessJQK = currentUser && currentUser.spaces.includes('JQK');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-teal-200">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 transition-all transform animate-bounce border ${
          notification.type === 'warning' ? 'bg-amber-500 text-white border-amber-600' : 'bg-teal-600 text-white border-teal-700'
        }`}>
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="font-medium text-sm">{notification.msg}</span>
        </div>
      )}

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-cyan-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 via-teal-400 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-200 transform hover:rotate-12 transition-transform">
              <span className="text-xl">🍀</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-sky-600 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                  about12b
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium">Sổ Kỷ Niệm & Cộng Đồng Học Sinh</p>
            </div>
          </div>

          {/* Space Toggle Controls */}
          <div className="hidden md:flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
            {canAccess12B && (
              <button
                onClick={() => { setActiveSpace('12B'); setActiveTab('whiteboard'); }}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeSpace === '12B'
                    ? 'bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-sky-600'
                }`}
              >
                <span>🎓 Space 12B</span>
                {currentUser?.classRoom === '12B' && <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />}
              </button>
            )}

            {canAccessJQK && (
              <button
                onClick={() => { setActiveSpace('JQK'); setActiveTab('feed'); }}
                className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeSpace === 'JQK'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600'
                }`}
              >
                <span>🌐 Cộng Đồng JQK</span>
              </button>
            )}
          </div>

          {/* User Status Bar & Coins */}
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Coins Counter */}
                <button
                  onClick={handleDailyCheckin}
                  title="Nhấn để điểm danh nhận 🧬 xu hằng ngày!"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-800 transition-all text-xs sm:text-sm font-bold group"
                >
                  <span className="text-base group-hover:scale-125 transition-transform">🧬</span>
                  <span>{currentUser.coins || 0}</span>
                  <span className="hidden sm:inline text-xs text-sky-600 font-normal">xu</span>
                </button>

                {/* Profile Avatar Badge */}
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt="Avatar"
                      className={`w-9 h-9 rounded-full object-cover shadow-sm ${currentUser.equippedFrame}`}
                    />
                    {currentUser.isTeacher && (
                      <span className="absolute -bottom-1 -right-1 bg-yellow-400 text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold text-slate-900 border border-white shadow">
                        ✓
                      </span>
                    )}
                  </div>

                  <div className="hidden lg:block text-left leading-tight">
                    <div className="flex items-center gap-1">
                      <span className="text-sm font-bold text-slate-800">
                        {currentUser.displayName}
                      </span>
                      {currentUser.role === 'alpha' && (
                        <span className="text-xs px-1.5 py-0.2 bg-purple-100 text-purple-700 font-extrabold rounded border border-purple-200" title="Chủ Quản Hệ Thống">
                          α
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      {currentUser.role === 'alpha' ? 'Chủ quản' : currentUser.isTeacher ? 'Giáo viên' : currentUser.classRoom}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setCurrentUser(null);
                      showToast('Đã đăng xuất hệ thống.');
                    }}
                    title="Đăng xuất"
                    className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLoginModalOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-xl transition-all border border-sky-200"
                >
                  Đăng Nhập
                </button>
                <button
                  onClick={() => setRegisterModalOpen(true)}
                  className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-600 hover:to-teal-600 rounded-xl shadow-sm transition-all"
                >
                  Đăng Ký
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Spaces bar */}
        <div className="md:hidden flex border-t border-slate-100 bg-slate-50/80 p-1.5 justify-center gap-2">
          {canAccess12B && (
            <button
              onClick={() => { setActiveSpace('12B'); setActiveTab('whiteboard'); }}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold text-center ${
                activeSpace === '12B' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 bg-white'
              }`}
            >
              🎓 12B Lớp Học
            </button>
          )}
          {canAccessJQK && (
            <button
              onClick={() => { setActiveSpace('JQK'); setActiveTab('feed'); }}
              className={`flex-1 py-1.5 px-3 rounded-xl text-xs font-bold text-center ${
                activeSpace === 'JQK' ? 'bg-teal-500 text-white shadow-sm' : 'text-slate-600 bg-white'
              }`}
            >
              🌐 Cộng Đồng JQK
            </button>
          )}
        </div>
      </header>

      {/* --- SUB TAB NAVIGATION BAR --- */}
      <nav className="bg-white border-b border-slate-200 shadow-xs px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center overflow-x-auto no-scrollbar gap-1 sm:gap-2 py-2">
          {activeSpace === '12B' ? (
            <>
              <TabBtn active={activeTab === 'whiteboard'} onClick={() => setActiveTab('whiteboard')} icon={<Edit3 className="w-4 h-4" />} label="Bảng Trắng 🍀" />
              <TabBtn active={activeTab === 'schedule'} onClick={() => setActiveTab('schedule')} icon={<Calendar className="w-4 h-4" />} label="Thời Khóa Biểu & Lịch Thi" />
              <TabBtn active={activeTab === 'passport'} onClick={() => setActiveTab('passport')} icon={<BookOpen className="w-4 h-4 text-sky-600" />} label="Sổ Ấn Tượng GV" highlight />
              <TabBtn active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} icon={<CheckSquare className="w-4 h-4" />} label="Trực Nhật & To-do" />
              <TabBtn active={activeTab === 'honor'} onClick={() => setActiveTab('honor')} icon={<Award className="w-4 h-4" />} label="Bảng Vàng & Vinh Danh" />
              <TabBtn active={activeTab === 'documents'} onClick={() => setActiveTab('documents')} icon={<FileText className="w-4 h-4" />} label="Kho Tài Liệu (🧬 +5)" />
              <TabBtn active={activeTab === 'members'} onClick={() => setActiveTab('members')} icon={<Users className="w-4 h-4" />} label="Danh Sách 12B" />
            </>
          ) : (
            <>
              <TabBtn active={activeTab === 'feed'} onClick={() => setActiveTab('feed')} icon={<Compass className="w-4 h-4" />} label="Bảng Tin Cộng Đồng" />
              <TabBtn active={activeTab === 'chat'} onClick={() => setActiveTab('chat')} icon={<MessageSquare className="w-4 h-4" />} label="Phòng Chat Nhóm" />
              <TabBtn active={activeTab === 'anon'} onClick={() => setActiveTab('anon')} icon={<FileText className="w-4 h-4 text-amber-600" />} label="Thư Ẩn Danh #123456" />
              <TabBtn active={activeTab === 'shop'} onClick={() => setActiveTab('shop')} icon={<ShoppingBag className="w-4 h-4 text-emerald-600" />} label="Cửa Hàng Phụ Kiện 🧬" />
              {currentUser?.role === 'alpha' && (
                <TabBtn active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} icon={<Shield className="w-4 h-4 text-purple-600" />} label="Quản Trị Hệ Thống α" />
              )}
            </>
          )}
        </div>
      </nav>

      {/* --- MAIN CONTENT CONTAINER --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {!currentUser ? (
          <GuestNotice onLogin={() => setLoginModalOpen(true)} onRegister={() => setRegisterModalOpen(true)} />
        ) : (
          <>
            {/* --- SPACE 12B TAB CONTENTS --- */}
            {activeSpace === '12B' && (
              <>
                {activeTab === 'whiteboard' && <WhiteboardSection />}
                {activeTab === 'schedule' && <ScheduleExamSection />}
                {activeTab === 'passport' && (
                  <PassportBookSection 
                    notes={passportNotes} 
                    setNotes={setPassportNotes} 
                    currentUser={currentUser} 
                    users={users}
                    showToast={showToast}
                  />
                )}
                {activeTab === 'tasks' && <TasksAndDutySection />}
                {activeTab === 'honor' && <HonorBoardSection users={users} />}
                {activeTab === 'documents' && (
                  <DocumentsSection 
                    documents={documents} 
                    setDocuments={setDocuments} 
                    currentUser={currentUser}
                    setCurrentUser={setCurrentUser}
                    showToast={showToast}
                  />
                )}
                {activeTab === 'members' && <MembersSection users={users.filter(u => u.spaces.includes('12B'))} currentUser={currentUser} />}
              </>
            )}

            {/* --- SPACE JQK TAB CONTENTS --- */}
            {activeSpace === 'JQK' && (
              <>
                {activeTab === 'feed' && (
                  <SocialFeedSection 
                    posts={posts} 
                    setPosts={setPosts} 
                    currentUser={currentUser} 
                    showToast={showToast} 
                  />
                )}
                {activeTab === 'chat' && (
                  <ChatRoomsSection 
                    chatRoom={chatRoom} 
                    setChatRoom={setChatRoom} 
                    messages={messages} 
                    setMessages={setMessages} 
                    currentUser={currentUser} 
                  />
                )}
                {activeTab === 'anon' && (
                  <AnonymousLettersSection 
                    letters={anonLetters} 
                    setLetters={setAnonLetters} 
                    showToast={showToast} 
                  />
                )}
                {activeTab === 'shop' && (
                  <ShopSection 
                    currentUser={currentUser} 
                    setCurrentUser={setCurrentUser} 
                    users={users} 
                    setUsers={setUsers} 
                    showToast={showToast} 
                  />
                )}
                {activeTab === 'admin' && currentUser.role === 'alpha' && (
                  <AdminPanelSection 
                    users={users} 
                    setUsers={setUsers} 
                    showToast={showToast} 
                  />
                )}
              </>
            )}
          </>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-base">🍀</span>
            <span className="font-semibold text-slate-700">about12b - Sổ Kỷ Niệm & Cộng Đồng Lớp Học</span>
          </div>
          <p>© 2026 Bản quyền thuộc về Lớp 12B. Vận hành bởi Chủ quản Alpha α (nkabt).</p>
        </div>
      </footer>

      {/* --- AUTH MODALS --- */}
      {loginModalOpen && (
        <LoginModal 
          onClose={() => setLoginModalOpen(false)} 
          users={users} 
          setCurrentUser={setCurrentUser} 
          showToast={showToast} 
        />
      )}
      {registerModalOpen && (
        <RegisterModal 
          onClose={() => setRegisterModalOpen(false)} 
          users={users} 
          setUsers={setUsers} 
          showToast={showToast} 
        />
      )}
    </div>
  );
}

// ==========================================
// COMPONENT MODULES & TAB SECTIONS
// ==========================================

function TabBtn({ active, onClick, icon, label, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
        active
          ? 'bg-sky-100 text-sky-800 shadow-xs border border-sky-200'
          : highlight
          ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function GuestNotice({ onLogin, onRegister }) {
  return (
    <div className="bg-gradient-to-br from-sky-50 via-teal-50 to-emerald-50 border border-sky-100 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm my-8">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md mb-4 text-emerald-500">
        🍀
      </div>
      <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Chào mừng bạn đến với about12b!</h2>
      <p className="text-slate-600 mb-6 text-sm leading-relaxed">
        Không gian lưu giữ khoảnh khắc thanh xuân 12B và cộng đồng giao lưu JQK sôi động. Hãy đăng nhập tài khoản của bạn hoặc đăng ký mới để được cấp quyền tham gia!
      </p>
      <div className="flex justify-center gap-4">
        <button
          onClick={onLogin}
          className="px-6 py-3 rounded-xl bg-sky-600 text-white font-bold hover:bg-sky-700 shadow-md transition-all text-sm"
        >
          Đăng Nhập Ngay
        </button>
        <button
          onClick={onRegister}
          className="px-6 py-3 rounded-xl bg-white text-teal-700 font-bold border border-teal-200 hover:bg-teal-50 shadow-sm transition-all text-sm"
        >
          Tạo Tài Khoản
        </button>
      </div>
      <div className="mt-8 text-xs text-slate-400 bg-white/60 p-3 rounded-xl inline-block border border-slate-200">
        💡 Tài khoản chủ quản thử nghiệm: User: <code className="text-sky-700 font-bold">nkabt</code> | Pass: <code className="text-sky-700 font-bold">Btrankem24</code>
      </div>
    </div>
  );
}

// ------------------------------------------
// 1. WHITEBOARD SECTION (Bảng trắng vẽ & note)
// ------------------------------------------
function WhiteboardSection() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#0077be');
  const [notes, setNotes] = useState([
    { id: 1, text: 'Thi THPT Quốc Gia còn 240 ngày! Cố lên 12B 🍀', x: 20, y: 20, color: 'bg-yellow-100 border-yellow-300' },
    { id: 2, text: 'Nộp quỹ lớp hạn chót Thứ 6 tuần này nhé mng - Gia Bảo', x: 220, y: 40, color: 'bg-emerald-100 border-emerald-300' }
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const addStickyNote = () => {
    if (!newNoteText.trim()) return;
    setNotes([
      ...notes,
      {
        id: Date.now(),
        text: newNoteText,
        x: Math.random() * 200 + 20,
        y: Math.random() * 150 + 20,
        color: 'bg-sky-100 border-sky-300'
      }
    ]);
    setNewNoteText('');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <span>🎨 Bảng Trắng Tương Tác 12B</span>
          </h2>
          <p className="text-xs text-slate-500">Vẽ tự do, viết ghi chú sticker đính lên bảng chung của lớp</p>
        </div>

        {/* Color pickers */}
        <div className="flex items-center gap-2">
          {['#0077be', '#20bf6b', '#eb3b5a', '#fa8231', '#8854d0', '#2d3436'].map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-7 h-7 rounded-full border-2 transition-transform ${color === c ? 'scale-125 border-slate-800 shadow-sm' : 'border-white'}`}
              style={{ backgroundColor: c }}
            />
          ))}
          <button
            onClick={clearCanvas}
            className="px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 ml-2"
          >
            Xóa nét vẽ
          </button>
        </div>
      </div>

      <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden min-h-[420px]">
        {/* Canvas background grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <canvas
          ref={canvasRef}
          width={900}
          height={450}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full h-[450px] cursor-crosshair relative z-10"
        />

        {/* Floating sticky notes */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-3 pointer-events-auto">
          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-3 rounded-2xl border shadow-md w-48 text-xs font-medium text-slate-800 transform rotate-1 hover:rotate-0 transition-transform ${note.color}`}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-[10px] text-slate-400 font-bold">📌 STICKER NOTE</span>
                <button
                  onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
                  className="text-slate-400 hover:text-red-500 font-bold"
                >
                  ×
                </button>
              </div>
              <p className="whitespace-pre-wrap">{note.text}</p>
            </div>
          ))}
        </div>

        {/* Add Note Bar */}
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-white/90 backdrop-blur border border-slate-200 p-2 rounded-2xl shadow-lg flex gap-2 max-w-xl mx-auto">
          <input
            type="text"
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Nhập nội dung sticker dán lên bảng..."
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={addStickyNote}
            className="px-4 py-2 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-all flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Dán Sticker
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// 2. SCHEDULE & EXAM SECTION
// ------------------------------------------
function ScheduleExamSection() {
  const [selectedDay, setSelectedDay] = useState('Thứ 2');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 7-Day Timetable */}
      <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-sky-600" />
            <span>Thời Khóa Biểu 7 Ngày Lớp 12B</span>
          </h2>
          <span className="text-xs px-2.5 py-1 bg-sky-50 text-sky-700 font-bold rounded-lg border border-sky-100">
            Học Kỳ I - Năm Học 2025-2026
          </span>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-2 no-scrollbar">
          {INITIAL_SCHEDULE.map((s) => (
            <button
              key={s.day}
              onClick={() => setSelectedDay(s.day)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedDay === s.day
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s.day}
            </button>
          ))}
        </div>

        {/* Subject Cards */}
        <div className="space-y-2 pt-2">
          {INITIAL_SCHEDULE.find((s) => s.day === selectedDay)?.subjects.map((sub, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-sky-50/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 font-black text-xs flex items-center justify-center">
                  Tiết {idx + 1}
                </span>
                <span className="font-extrabold text-slate-800 text-sm">{sub}</span>
              </div>
              <span className="text-xs text-slate-400 font-medium">07:00 - 11:30</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exam Countdown Widget */}
      <div className="space-y-4">
        <div className="bg-gradient-to-br from-sky-600 via-teal-600 to-emerald-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-white/10 font-black text-8xl pointer-events-none">
            THPT
          </div>
          <span className="text-xs font-extrabold tracking-widest uppercase text-teal-200 bg-white/10 px-2.5 py-1 rounded-md inline-block mb-3">
            🎯 Lịch Thi Quốc Gia 2026
          </span>
          <h3 className="text-xl font-black mb-1">Kỳ Thi THPT Quốc Gia</h3>
          <p className="text-xs text-teal-100 mb-6">Đếm ngược ngày thi chính thức năm 2026</p>

          <div className="grid grid-cols-3 gap-2 text-center bg-white/10 backdrop-blur p-3 rounded-xl border border-white/20">
            <div>
              <span className="text-2xl font-black block">240</span>
              <span className="text-[10px] text-teal-100 font-bold uppercase">Ngày</span>
            </div>
            <div>
              <span className="text-2xl font-black block">14</span>
              <span className="text-[10px] text-teal-100 font-bold uppercase">Giờ</span>
            </div>
            <div>
              <span className="text-2xl font-black block">35</span>
              <span className="text-[10px] text-teal-100 font-bold uppercase">Phút</span>
            </div>
          </div>
        </div>

        {/* Upcoming Exams List */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Lịch Kiểm Tra Lớp 12B Nhắc Nhở</span>
          </h3>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-emerald-900 block">Kiểm tra 1 Tiết Toán Giải Tích</span>
                <span className="text-[11px] text-emerald-700">Chương III: Tích Phân & Ứng Dụng</span>
              </div>
              <span className="font-extrabold text-emerald-800 bg-white px-2 py-1 rounded-lg border border-emerald-200">
                Thứ 6 Tới
              </span>
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center">
              <div>
                <span className="font-bold text-amber-900 block">Thi Thử THPT QG Lần 1</span>
                <span className="text-[11px] text-amber-700">3 Môn Bắt Buộc + Tổ Hợp</span>
              </div>
              <span className="font-extrabold text-amber-800 bg-white px-2 py-1 rounded-lg border border-amber-200">
                15/11/2026
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// 3. PASSPORT IMPRESSION BOOK (Sổ Ấn Tượng Giáo Viên)
// ------------------------------------------
function PassportBookSection({ notes, setNotes, currentUser, users, showToast }) {
  const [selectedStudent, setSelectedStudent] = useState(users.find((u) => !u.isTeacher) || users[0]);
  const [newNoteContent, setNewNoteContent] = useState('');
  const [stampAngle, setStampAngle] = useState(0);

  const students = users.filter((u) => !u.isTeacher && u.status === 'approved');
  const studentNote = notes.find((n) => n.studentId === selectedStudent.id);

  const handleSaveTeacherNote = () => {
    if (!currentUser.isTeacher && currentUser.role !== 'alpha') {
      showToast('Chỉ Giáo viên (🟡 tích vàng) mới có quyền đóng dấu nhận xét vào sổ!', 'warning');
      return;
    }
    if (!newNoteContent.trim()) return;

    const newNote = {
      id: `p_${Date.now()}`,
      studentId: selectedStudent.id,
      studentName: selectedStudent.realName || selectedStudent.displayName,
      teacherName: currentUser.displayName,
      teacherId: currentUser.id,
      content: newNoteContent,
      stampPos: { x: 65, y: 35, rotate: stampAngle },
      date: new Date().toISOString().split('T')[0]
    };

    setNotes([...notes.filter((n) => n.studentId !== selectedStudent.id), newNote]);
    setNewNoteContent('');
    showToast(`Đã đóng dấu nhận xét thành công vào Passport của ${selectedStudent.displayName}! 🍀`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-sky-800 to-sky-900 text-white p-6 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-widest mb-1">
            <BookOpen className="w-4 h-4" /> Sổ Hộ Chiếu Học Sinh - 12B Passport
          </div>
          <h2 className="text-2xl font-black">Sổ Nhận Xét & Dấu Ấn Giáo Viên</h2>
          <p className="text-xs text-sky-200 mt-1 max-w-xl">
            Cuốn sổ Passport màu xanh nước biển đặc trưng. Giáo viên xem sổ, thêm trang nhận xét và đóng con dấu đỏ xác nhận trực tiếp lên trang!
          </p>
        </div>

        {/* Student selector dropdown */}
        <div className="bg-sky-950/60 p-3 rounded-2xl border border-sky-700/50 flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold text-sky-200 whitespace-nowrap">Chọn Học Sinh:</span>
          <select
            value={selectedStudent.id}
            onChange={(e) => {
              const st = users.find((u) => u.id === e.target.value);
              if (st) setSelectedStudent(st);
            }}
            className="bg-sky-900 text-white text-xs font-bold px-3 py-2 rounded-xl focus:outline-none border border-sky-600 w-full"
          >
            {students.map((st) => (
              <option key={st.id} value={st.id}>
                {st.displayName} ({st.realName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Passport Book Visual Canvas View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Passport Blue Booklet Surface */}
        <div className="bg-sky-900 rounded-3xl p-6 sm:p-8 text-slate-800 shadow-2xl border-4 border-sky-950 relative overflow-hidden min-h-[400px]">
          {/* Gold Emblem Design */}
          <div className="absolute top-4 right-4 text-amber-400/20 text-7xl font-black pointer-events-none select-none">
            12B
          </div>

          <div className="bg-amber-50 rounded-2xl p-6 shadow-inner border border-amber-200 min-h-[340px] relative flex flex-col justify-between">
            <div>
              {/* Header inside passport page */}
              <div className="flex items-center justify-between border-b-2 border-dashed border-amber-300 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-sky-800 text-white flex items-center justify-center font-bold text-xs">
                    12B
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-sky-950">PASSPORT IMPRESSION</h4>
                    <span className="text-[10px] text-amber-800 font-bold block">SO NHAN XET TRUONG THPT</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-200 px-2 py-0.5 rounded">
                  #P-{selectedStudent.id.substring(0, 5).toUpperCase()}
                </span>
              </div>

              {/* Student info strip */}
              <div className="flex items-center gap-4 mb-4 bg-white/70 p-3 rounded-xl border border-amber-200">
                <img
                  src={selectedStudent.avatar}
                  alt="Student"
                  className="w-14 h-14 rounded-xl object-cover border-2 border-sky-800 shadow-sm"
                />
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">{selectedStudent.realName || selectedStudent.displayName}</h3>
                  <p className="text-xs text-slate-600">Lớp: <span className="font-bold text-sky-800">{selectedStudent.classRoom}</span> | Ngày sinh: {selectedStudent.dob}</p>
                  <p className="text-[11px] text-slate-500 italic mt-0.5">"{selectedStudent.bio}"</p>
                </div>
              </div>

              {/* Teacher impression text content */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider block">
                  📝 Lời Nhận Xét Của Giáo Viên:
                </span>
                {studentNote ? (
                  <p className="text-xs font-medium text-slate-800 leading-relaxed italic bg-amber-100/50 p-3 rounded-xl border border-amber-200">
                    "{studentNote.content}"
                  </p>
                ) : (
                  <p className="text-xs text-amber-800 italic bg-amber-100/30 p-4 rounded-xl border border-dashed border-amber-300 text-center">
                    Trang sổ này chưa có lời nhận xét nào từ Giáo Viên.
                  </p>
                )}
              </div>
            </div>

            {/* RED TEACHER STAMP (CON DẤU ĐỎ TƯƠNG TÁC) */}
            {studentNote && (
              <div
                className="absolute w-28 h-28 rounded-full border-4 border-red-600/90 text-red-600 font-black p-2 text-center flex flex-col items-center justify-center rotate-[-12deg] shadow-xs pointer-events-none bg-red-500/10 backdrop-blur-[1px]"
                style={{
                  bottom: '20px',
                  right: '20px',
                  transform: `rotate(${studentNote.stampPos?.rotate || -10}deg)`
                }}
              >
                <span className="text-[8px] tracking-tighter uppercase font-extrabold border-b border-red-500 w-full text-center">
                  ĐÃ XÁC NHẬN
                </span>
                <span className="text-xs my-0.5 font-extrabold leading-tight">{studentNote.teacherName}</span>
                <span className="text-[7px] text-red-700">{studentNote.date}</span>
                <span className="text-[8px]">★ 12B ★</span>
              </div>
            )}
          </div>
        </div>

        {/* Teacher Action Controls (Chỉ GV hoặc Alpha) */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <span className="text-yellow-500">🟡</span>
              <span>Góc Giáo Viên Nhập Lời Phê</span>
            </h3>
            {currentUser.isTeacher || currentUser.role === 'alpha' ? (
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-full">
                Có Quyền Đóng Dấu
              </span>
            ) : (
              <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full">
                Chỉ Xem Sổ
              </span>
            )}
          </div>

          {(currentUser.isTeacher || currentUser.role === 'alpha') ? (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nhập nhận xét học sinh {selectedStudent.displayName}:
                </label>
                <textarea
                  rows={4}
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Viết nhận xét về tinh thần học tập, tính cách, lời chúc..."
                  className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {/* Stamp Rotation Slider */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Xoay Con Dấu Đỏ Xác Nhận ({stampAngle}°):
                </label>
                <input
                  type="range"
                  min="-45"
                  max="45"
                  value={stampAngle}
                  onChange={(e) => setStampAngle(Number(e.target.value))}
                  className="w-full accent-red-600"
                />
              </div>

              <button
                onClick={handleSaveTeacherNote}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-xs rounded-xl hover:from-red-700 hover:to-rose-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Đóng Dấu Đỏ & Lưu Vào Sổ Passport
              </button>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
              🔒 Bạn đang đăng nhập với tư cách Học Sinh. Bạn chỉ có quyền lật xem các trang Passport lưu lại nhận xét của các Thầy Cô giáo và không được tự tạo con dấu xác nhận.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ------------------------------------------
// 4. TASKS & DUTY SECTION (Trực nhật & To-do list)
// ------------------------------------------
function TasksAndDutySection() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Chuẩn bị phấn, giẻ lau bảng và nước uống GV', group: 'Tổ 1', done: true },
    { id: 2, text: 'Kê lại bàn ghế ngay ngắn sau giờ ra chơi', group: 'Tổ 2', done: false },
    { id: 3, text: 'Quét dọn vệ sinh hành lang trước phòng 12B', group: 'Tổ 3', done: false },
    { id: 4, text: 'Tắt quạt và đèn khi kết thúc buổi học', group: 'Tổ 4', done: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText, group: 'Chung', done: false }]);
    setNewTaskText('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Duty Assignment 4 Groups */}
      <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-600" />
          <span>Bảng Phân Công Trực Nhật 4 Tổ Lớp 12B</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { g: 'Tổ 1', leader: 'Gia Bảo', members: 'Nguyễn Khánh, Lan Anh, Minh Tuấn', day: 'Thứ 2 & Thứ 6' },
            { g: 'Tổ 2', leader: 'Lan Anh 🍀', members: 'Thu Thảo, Hoàng Nam, Quốc Anh', day: 'Thứ 3' },
            { g: 'Tổ 3', leader: 'Đức Anh', members: 'Thùy Linh, Văn Hùng, Yến Nhi', day: 'Thứ 4' },
            { g: 'Tổ 4', leader: 'Ngọc Mai', members: 'Tuấn Kiệt, Phương Thảo, Quang Huy', day: 'Thứ 5 & Thứ 7' }
          ].map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors">
              <div className="flex justify-between items-center mb-2">
                <span className="font-extrabold text-sky-800 text-sm">{item.g}</span>
                <span className="text-[11px] font-bold bg-sky-100 text-sky-700 px-2.5 py-0.5 rounded-full">
                  {item.day}
                </span>
              </div>
              <p className="text-xs text-slate-700 mb-1">
                <span className="font-semibold text-slate-900">Tổ trưởng:</span> {item.leader}
              </p>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Thành viên:</span> {item.members}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Checklist Todo */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
          <CheckSquare className="w-4 h-4 text-emerald-600" />
          <span>To-Do List Công Việc Lớp</span>
        </h3>

        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Thêm việc cần làm..."
            className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={addTask}
            className="px-3 py-2 bg-sky-600 text-white font-bold text-xs rounded-xl hover:bg-sky-700 transition-colors"
          >
            Thêm
          </button>
        </div>

        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                task.done ? 'bg-emerald-50/50 border-emerald-200 opacity-75' : 'bg-slate-50 border-slate-200 hover:bg-sky-50'
              }`}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => {}}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
              />
              <span className={`text-xs font-medium flex-1 ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// 5. HONOR BOARD SECTION (Bảng vàng vinh danh)
// ------------------------------------------
function HonorBoardSection({ users }) {
  const topStudents = users.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white p-6 rounded-3xl shadow-md flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
            🏆 Vinh Danh Tháng 10
          </span>
          <h2 className="text-2xl font-black mt-2">Bảng Vàng Học Sinh Xuất Sắc Lớp 12B</h2>
          <p className="text-xs text-amber-100 mt-1">Tuyên dương các thành viên có thành tích học tập và đóng góp xuất sắc 🍀</p>
        </div>
        <Crown className="w-16 h-16 text-yellow-200 opacity-80 hidden sm:block" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {topStudents.map((st, idx) => (
          <div key={st.id} className="bg-white rounded-3xl border border-slate-200 p-6 text-center shadow-xs relative overflow-hidden">
            <div className="absolute top-3 left-3 w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-black text-sm flex items-center justify-center">
              #{idx + 1}
            </div>
            <img
              src={st.avatar}
              alt="Ranker"
              className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-amber-300 shadow-md"
            />
            <h3 className="font-extrabold text-slate-900 text-base">{st.displayName}</h3>
            <p className="text-xs text-slate-500 mb-3">{st.realName}</p>
            <div className="inline-block bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl text-xs font-bold">
              🌟 {idx === 0 ? 'Thủ khoa kỳ kiểm tra tháng' : idx === 1 ? 'Học sinh giỏi toàn diện' : 'Hăng hái phát biểu nhất'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------
// 6. DOCUMENTS SECTION (Kho tài liệu học tập + Thưởng 5 xu)
// ------------------------------------------
function DocumentsSection({ documents, setDocuments, currentUser, setCurrentUser, showToast }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Toán Học');
  const [link, setLink] = useState('');

  const handleAddDocument = () => {
    if (!title.trim() || !link.trim()) {
      showToast('Vui lòng điền tiêu đề và đường link tài liệu!', 'warning');
      return;
    }

    const newDoc = {
      id: `doc_${Date.now()}`,
      title,
      uploader: currentUser.displayName,
      uploaderId: currentUser.id,
      category,
      link,
      date: new Date().toISOString().split('T')[0],
      downloads: 1
    };

    setDocuments([newDoc, ...documents]);
    
    // Reward 5 DNA / Xu
    const updatedUser = { ...currentUser, coins: (currentUser.coins || 0) + 5 };
    setCurrentUser(updatedUser);

    setTitle('');
    setLink('');
    showToast('🎉 Đã chia sẻ tài liệu thành công! Bạn nhận được thưởng +5 🧬 xu!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <span>Kho Tài Liệu Học Tập 12B</span>
          </h2>
          <p className="text-xs text-slate-500">Chia sẻ đề thi, sơ đồ tư duy - Nhận ngay <strong className="text-emerald-600">+5 🧬 xu</strong> cho mỗi tài liệu!</p>
        </div>
      </div>

      {/* Upload Form */}
      <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200 space-y-3">
        <h3 className="font-extrabold text-xs text-emerald-900 uppercase tracking-wider">➕ Chia Sẻ Tài Liệu Mới</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề tài liệu (VD: Đề thi thử Toán 12...)"
            className="text-xs p-2.5 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-xs p-2.5 bg-white border border-emerald-200 rounded-xl focus:outline-none"
          >
            {['Toán Học', 'Ngữ Văn', 'Tiếng Anh', 'Vật Lý', 'Hóa Học', 'Sinh Học', 'Lịch Sử - Địa Lý'].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link Google Drive / Tải tệp..."
            className="text-xs p-2.5 bg-white border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
        <button
          onClick={handleAddDocument}
          className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-sm transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Đăng Tài Liệu (+5 🧬 Xu)
        </button>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start gap-2 mb-2">
                <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  {doc.category}
                </span>
                <span className="text-[10px] text-slate-400">{doc.date}</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-800 mb-2 leading-snug">{doc.title}</h3>
              <p className="text-xs text-slate-500 mb-4">Người đăng: <span className="font-bold text-slate-700">{doc.uploader}</span></p>
            </div>

            <a
              href={doc.link}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-slate-100 hover:bg-sky-50 text-sky-700 font-bold text-xs rounded-xl border border-slate-200 hover:border-sky-300 text-center transition-colors block"
            >
              📥 Mở / Tải Về Tài Liệu
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------
// 7. MEMBERS LIST SECTION
// ------------------------------------------
function MembersSection({ users, currentUser }) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
        <Users className="w-5 h-5 text-sky-600" />
        <span>Danh Sách Thành Viên Lớp 12B ({users.length})</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
            <img src={u.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover border border-slate-200" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-extrabold text-slate-900 text-sm">{u.displayName}</h3>
                {u.isTeacher && <span className="text-yellow-500 text-xs">🟡</span>}
                {u.role === 'alpha' && <span className="text-purple-600 font-black text-xs">α</span>}
              </div>
              <p className="text-xs text-slate-500">{u.realName}</p>
              <span className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-2 py-0.5 rounded-full inline-block mt-1">
                {u.futureJob || 'Học sinh 12B'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ------------------------------------------
// 8. JQK SOCIAL FEED SECTION (Mạng xã hội)
// ------------------------------------------
function SocialFeedSection({ posts, setPosts, currentUser, showToast }) {
  const [content, setContent] = useState('');

  const handleCreatePost = () => {
    if (!content.trim()) return;
    const newPost = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      authorName: currentUser.displayName,
      authorAvatar: currentUser.avatar,
      content,
      image: null,
      likes: 0,
      likedBy: [],
      comments: [],
      time: 'Vừa xong'
    };
    setPosts([newPost, ...posts]);
    setContent('');
    showToast('Đã đăng bài viết lên Bảng tin JQK! 🍀');
  };

  const handleToggleLike = (postId) => {
    setPosts(
      posts.map((p) => {
        if (p.id !== postId) return p;
        const hasLiked = p.likedBy.includes(currentUser.id);
        return {
          ...p,
          likes: hasLiked ? p.likes - 1 : p.likes + 1,
          likedBy: hasLiked ? p.likedBy.filter((id) => id !== currentUser.id) : [...p.likedBy, currentUser.id]
        };
      })
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Create Post Box */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-3">
          <img src={currentUser.avatar} alt="Me" className="w-10 h-10 rounded-full object-cover" />
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Bạn đang nghĩ gì vậy, ${currentUser.displayName}?`}
            className="flex-1 bg-slate-50 text-xs sm:text-sm p-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <span className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">🖼️ Ảnh</span>
            <span className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">🍀 Hashtag</span>
          </div>
          <button
            onClick={handleCreatePost}
            className="px-5 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm hover:from-teal-600 hover:to-emerald-600 transition-all"
          >
            Đăng Bài
          </button>
        </div>
      </div>

      {/* Posts Stream */}
      <div className="space-y-4">
        {posts.map((post) => {
          const isLiked = post.likedBy.includes(currentUser.id);
          return (
            <div key={post.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              {/* Author Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={post.authorAvatar} alt="Author" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-sm">{post.authorName}</h3>
                    <span className="text-[10px] text-slate-400">{post.time}</span>
                  </div>
                </div>
              </div>

              {/* Text & Image Content */}
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">{post.content}</p>
              {post.image && (
                <img src={post.image} alt="Post Attachment" className="w-full h-64 object-cover rounded-2xl border" />
              )}

              {/* Interactions Bar */}
              <div className="flex items-center gap-4 pt-3 border-t border-slate-100 text-xs font-bold">
                <button
                  onClick={() => handleToggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    isLiked ? 'text-rose-600' : 'text-slate-500 hover:text-rose-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
                  <span>{post.likes} Thích</span>
                </button>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments.length} Bình luận</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------
// 9. JQK CHAT ROOMS SECTION
// ------------------------------------------
function ChatRoomsSection({ chatRoom, setChatRoom, messages, setMessages, currentUser }) {
  const [inputMsg, setInputMsg] = useState('');
  const rooms = ['Tổng', 'Học tập', 'Minecraft', 'Liên Quân', 'TFT', 'Mobile Legends', 'Tốc Chiến', 'Stardew Valley'];

  const handleSend = () => {
    if (!inputMsg.trim()) return;
    const newM = {
      id: `m_${Date.now()}`,
      sender: currentUser.displayName,
      text: inputMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [chatRoom]: [...(messages[chatRoom] || []), newM]
    });
    setInputMsg('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden grid grid-cols-1 md:grid-cols-4 h-[550px]">
      {/* Sidebar Rooms */}
      <div className="bg-slate-50 border-r border-slate-200 p-4 space-y-2 overflow-y-auto">
        <h3 className="font-extrabold text-xs text-slate-400 uppercase tracking-wider mb-2">Phòng Chat JQK</h3>
        {rooms.map((r) => (
          <button
            key={r}
            onClick={() => setChatRoom(r)}
            className={`w-full text-left px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center justify-between ${
              chatRoom === r ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-700 hover:bg-slate-200/60'
            }`}
          >
            <span>💬 {r}</span>
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="md:col-span-3 flex flex-col justify-between p-4 bg-slate-50/30">
        {/* Header */}
        <div className="pb-3 border-b border-slate-200 flex justify-between items-center">
          <h3 className="font-extrabold text-slate-800 text-sm">Phòng Chat: {chatRoom}</h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full font-bold">
            Trực Tuyến
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto my-4 space-y-3 pr-2">
          {(messages[chatRoom] || []).map((m) => {
            const isMe = m.sender === currentUser.displayName;
            return (
              <div key={m.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                <span className="text-[10px] text-slate-400 mb-0.5">{m.sender} - {m.time}</span>
                <div
                  className={`max-w-xs sm:max-w-md p-3 rounded-2xl text-xs leading-relaxed font-medium ${
                    isMe
                      ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="flex gap-2 pt-2 border-t border-slate-200">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={`Nhắn tin vào phòng ${chatRoom}...`}
            className="flex-1 text-xs px-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleSend}
            className="px-5 py-3 bg-teal-600 text-white font-bold text-xs rounded-2xl hover:bg-teal-700 transition-colors flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// 10. ANONYMOUS LETTERS SECTION (Thư ẩn danh)
// ------------------------------------------
function AnonymousLettersSection({ letters, setLetters, showToast }) {
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [content, setContent] = useState('');

  const handleSendAnonLetter = () => {
    if (!title.trim() || !content.trim()) {
      showToast('Vui lòng điền tiêu đề và nội dung thư!', 'warning');
      return;
    }

    const randomCode = `#${Math.floor(100000 + Math.random() * 900000)}`;
    const newLetter = {
      id: `letter_${Date.now()}`,
      publicCode: randomCode,
      title,
      recipient: recipient.trim() || 'Người giấu tên',
      content,
      readCount: 1,
      likes: 0,
      date: new Date().toISOString().split('T')[0],
      comments: []
    };

    setLetters([newLetter, ...letters]);
    setTitle('');
    setRecipient('');
    setContent('');
    showToast(`Đã gửi Thư Ẩn Danh mã ${randomCode}! Bảo mật danh tính tuyệt đối 🍀`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-amber-100/80 border border-amber-300 rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase text-amber-800 bg-amber-200/80 px-3 py-1 rounded-full">
            📜 Thư Ẩn Danh #123456
          </span>
          <h2 className="text-xl font-black text-amber-950 mt-2">Gửi Gắm Tâm Tư - Chữ Thư Pháp Cổ Điển</h2>
          <p className="text-xs text-amber-900 mt-1">Gửi thư không tiết lộ danh tính hay ngày sinh. Mỗi lá thư mang một mã công khai ngẫu nhiên!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Letter Composer */}
        <div className="bg-amber-50 p-5 rounded-3xl border border-amber-200 shadow-xs space-y-3">
          <h3 className="font-extrabold text-sm text-amber-950">✍️ Viết Thư Ẩn Danh Mới</h3>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Tiêu đề lá thư..."
            className="w-full text-xs p-3 bg-white border border-amber-200 rounded-xl focus:outline-none"
          />
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Gửi tới ai? (Tùy chọn: Bạn lớp trưởng, Thầy Cô...)"
            className="w-full text-xs p-3 bg-white border border-amber-200 rounded-xl focus:outline-none"
          />
          <textarea
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Nội dung tâm tư ẩn danh..."
            className="w-full text-xs p-3 bg-white border border-amber-200 rounded-xl focus:outline-none"
          />
          <button
            onClick={handleSendAnonLetter}
            className="w-full py-3 bg-amber-800 text-amber-100 font-extrabold text-xs rounded-xl hover:bg-amber-900 transition-colors shadow-sm"
          >
            ✉️ Niêm Phong & Gửi Ẩn Danh
          </button>
        </div>

        {/* Letters Stream View */}
        <div className="lg:col-span-2 space-y-4">
          {letters.map((letItem) => (
            <div
              key={letItem.id}
              className="bg-gradient-to-br from-amber-50 to-orange-50/40 p-6 rounded-3xl border-2 border-amber-200 shadow-sm relative space-y-3 font-serif"
            >
              <div className="flex justify-between items-center border-b border-amber-200/80 pb-2">
                <span className="font-mono text-xs font-black text-amber-900">{letItem.publicCode}</span>
                <span className="text-[10px] text-amber-700 font-sans">Gửi tới: <strong>{letItem.recipient}</strong></span>
              </div>

              <h3 className="font-bold text-amber-950 text-base">{letItem.title}</h3>
              <p className="text-xs text-amber-900 leading-relaxed italic whitespace-pre-wrap">
                "{letItem.content}"
              </p>

              <div className="flex justify-between items-center pt-2 text-[11px] font-sans text-amber-800">
                <span>📅 {letItem.date}</span>
                <span>👁️ {letItem.readCount} Lượt đọc</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------
// 11. SHOP SECTION (Cửa hàng Phụ kiện 🧬)
// ------------------------------------------
function ShopSection({ currentUser, setCurrentUser, users, setUsers, showToast }) {
  const handleBuy = (item) => {
    if ((currentUser.coins || 0) < item.price) {
      showToast(`Bạn không đủ 🧬 xu! Cần ${item.price} xu để mua item này.`, 'warning');
      return;
    }

    if (currentUser.inventory?.includes(item.id)) {
      showToast('Bạn đã sở hữu phụ kiện này trong rương!', 'warning');
      return;
    }

    const updated = {
      ...currentUser,
      coins: currentUser.coins - item.price,
      inventory: [...(currentUser.inventory || []), item.id]
    };

    setCurrentUser(updated);
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    showToast(`🎉 Mua thành công ${item.name}! Đã thêm vào Kho phụ kiện.`);
  };

  const handleEquip = (item) => {
    let updated = { ...currentUser };
    if (item.type === 'frame') updated.equippedFrame = item.preview;
    if (item.type === 'badge') updated.equippedBadge = item.symbol;
    if (item.type === 'nametag') updated.equippedNameTag = item.text;

    setCurrentUser(updated);
    setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
    showToast(`Đã trang bị ${item.name}! 🍀`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-3xl shadow-md flex justify-between items-center">
        <div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full uppercase">
            🛍️ Cửa Hàng Phụ Kiện Profile 🧬
          </span>
          <h2 className="text-2xl font-black mt-2">Đổi 🧬 Xu Lấy Khung & Badge</h2>
          <p className="text-xs text-emerald-100 mt-1">Trang trí Avatar, Nghề nghiệp tương lai & Khung viền VIP!</p>
        </div>
        <div className="text-right bg-white/10 p-3 rounded-2xl border border-white/20">
          <span className="text-xs text-emerald-100 block font-bold">Số dư hiện tại:</span>
          <span className="text-xl font-black text-yellow-300">🧬 {currentUser.coins || 0} Xu</span>
        </div>
      </div>

      {/* Shop Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SHOP_ITEMS.map((item) => {
          const owned = currentUser.inventory?.includes(item.id);
          return (
            <div key={item.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-2xl mb-3 shadow-inner">
                  {item.type === 'frame' ? '🖼️' : item.type === 'badge' ? '🍀' : '🏷️'}
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm text-center">{item.name}</h3>
                <span className="text-xs font-bold text-emerald-600 block text-center mt-1">🧬 {item.price} Xu</span>
              </div>

              {owned ? (
                <button
                  onClick={() => handleEquip(item)}
                  className="w-full py-2 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition-colors"
                >
                  Trang Bị Item
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(item)}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Mua Ngay
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ------------------------------------------
// 12. ADMIN PANEL SECTION (Chủ quản α nkabt)
// ------------------------------------------
function AdminPanelSection({ users, setUsers, showToast }) {
  const handleApprove = (userId) => {
    setUsers(users.map((u) => (u.id === userId ? { ...u, status: 'approved' } : u)));
    showToast('Đã duyệt tài khoản thành công! 🍀');
  };

  const handleAdjustCoins = (userId, amount) => {
    setUsers(
      users.map((u) => (u.id === userId ? { ...u, coins: Math.max(0, (u.coins || 0) + amount) } : u))
    );
    showToast(`Đã điều chỉnh ${amount > 0 ? '+' : ''}${amount} 🧬 xu cho thành viên.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-lg flex justify-between items-center">
        <div>
          <span className="text-xs font-bold bg-purple-500/30 text-purple-300 border border-purple-500 px-3 py-1 rounded-full">
            Hệ Thống Quản Trị Chủ Quản α
          </span>
          <h2 className="text-2xl font-black mt-2">Admin Dashboard - nkabt 🍀</h2>
          <p className="text-xs text-slate-400 mt-1">Toàn quyền kiểm duyệt tài khoản, phân không gian 12B/JQK và quản lý số dư 🧬 xu</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs overflow-x-auto">
        <h3 className="font-extrabold text-slate-800 text-sm mb-4">Danh Sách Tài Khoản Hệ Thống ({users.length})</h3>
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[10px]">
              <th className="p-3">User</th>
              <th className="p-3">Họ Tên</th>
              <th className="p-3">Lớp</th>
              <th className="p-3">Không gian</th>
              <th className="p-3">Số Xu 🧬</th>
              <th className="p-3">Trạng thái</th>
              <th className="p-3 text-right">Thao Tác Admin</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-50/80">
                <td className="p-3 font-bold text-slate-800">{u.username}</td>
                <td className="p-3">{u.realName}</td>
                <td className="p-3">{u.classRoom}</td>
                <td className="p-3">{u.spaces.join(', ')}</td>
                <td className="p-3 font-bold text-emerald-600">🧬 {u.coins || 0}</td>
                <td className="p-3">
                  {u.status === 'approved' ? (
                    <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold text-[10px]">Đã duyệt</span>
                  ) : (
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold text-[10px]">Chờ duyệt</span>
                  )}
                </td>
                <td className="p-3 text-right space-x-1">
                  {u.status === 'pending' && (
                    <button
                      onClick={() => handleApprove(u.id)}
                      className="px-2.5 py-1 bg-emerald-600 text-white rounded-lg font-bold text-[10px]"
                    >
                      Duyệt
                    </button>
                  )}
                  <button
                    onClick={() => handleAdjustCoins(u.id, 50)}
                    className="px-2 py-1 bg-sky-100 text-sky-800 rounded-lg font-bold text-[10px]"
                  >
                    +50🧬
                  </button>
                  <button
                    onClick={() => handleAdjustCoins(u.id, -50)}
                    className="px-2 py-1 bg-rose-100 text-rose-800 rounded-lg font-bold text-[10px]"
                  >
                    -50🧬
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ------------------------------------------
// LOGIN & REGISTER MODALS
// ------------------------------------------
function LoginModal({ onClose, users, setCurrentUser, showToast }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Default Alpha login fast pass check
    if (username === 'nkabt' && password === 'Btrankem24') {
      const alphaUser = users.find((u) => u.username === 'nkabt');
      if (alphaUser) {
        setCurrentUser(alphaUser);
        showToast('Chào mừng Chủ quản Alpha α (nkabt) quay trở lại! 🍀');
        onClose();
        return;
      }
    }

    const found = users.find((u) => u.username === username);
    if (found) {
      if (found.status === 'pending') {
        showToast('Tài khoản của bạn đang chờ Chủ quản α xét duyệt!', 'warning');
        return;
      }
      setCurrentUser(found);
      showToast(`Đăng nhập thành công! Chào ${found.displayName}`);
      onClose();
    } else {
      showToast('Tên đăng nhập hoặc mật khẩu không chính xác!', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative space-y-4">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
        <h3 className="text-xl font-black text-slate-800 text-center">Đăng Nhập about12b</h3>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tên đăng nhập:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username..."
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Mật khẩu:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-sky-600 text-white font-extrabold text-xs rounded-xl hover:bg-sky-700 transition-colors shadow-sm"
          >
            Đăng Nhập
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center">
          Chủ quản α: <code className="text-sky-700 font-bold">nkabt</code> | Mật khẩu: <code className="text-sky-700 font-bold">Btrankem24</code>
        </p>
      </div>
    </div>
  );
}

function RegisterModal({ onClose, users, setUsers, showToast }) {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [realName, setRealName] = useState('');
  const [dob, setDob] = useState('');
  const [classRoom, setClassRoom] = useState('12B');
  const [spaceChoice, setSpaceChoice] = useState('BOTH'); // 12B, JQK, BOTH

  const handleRegister = (e) => {
    e.preventDefault();
    if (!username.trim() || !displayName.trim()) {
      showToast('Vui lòng điền đầy đủ thông tin đăng ký!', 'warning');
      return;
    }

    const newU = {
      id: `u_${Date.now()}`,
      username,
      displayName,
      realName: realName || displayName,
      dob: dob || '2006-01-01',
      classRoom,
      role: 'student',
      spaces: spaceChoice === 'BOTH' ? ['12B', 'JQK'] : [spaceChoice],
      status: 'pending', // Chờ duyệt
      isTeacher: false,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      bio: 'Thành viên mới',
      futureJob: 'Học sinh',
      coins: 0,
      equippedFrame: '',
      equippedBadge: '',
      equippedNameTag: '',
      inventory: []
    };

    setUsers([...users, newU]);
    showToast('Tạo tài khoản thành công! Vui lòng chờ Chủ quản α xét duyệt. 🍀');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative space-y-4 max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold">✕</button>
        <h3 className="text-xl font-black text-slate-800 text-center">Đăng Ký Tài Khoản Mới</h3>

        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tên đăng nhập duy nhất:</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="VD: minhanh12b"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Tên hiển thị:</label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="VD: Minh Anh 🍀"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Họ và tên thật:</label>
            <input
              type="text"
              value={realName}
              onChange={(e) => setRealName(e.target.value)}
              placeholder="VD: Nguyễn Minh Anh"
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ngày sinh:</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Lớp:</label>
              <input
                type="text"
                value={classRoom}
                onChange={(e) => setClassRoom(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Đăng ký vào không gian:</label>
            <select
              value={spaceChoice}
              onChange={(e) => setSpaceChoice(e.target.value)}
              className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-bold text-teal-800"
            >
              <option value="BOTH">Cả Hai Không Gian (12B & JQK)</option>
              <option value="12B">Chỉ Không Gian 12B</option>
              <option value="JQK">Chỉ Cộng Đồng JQK</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-teal-500 text-white font-extrabold text-xs rounded-xl hover:from-sky-600 hover:to-teal-600 transition-all shadow-sm"
          >
            Gửi Đăng Ký Xát Duyệt
          </button>
        </form>
      </div>
    </div>
  );
}
