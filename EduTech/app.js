const state = {
  isLoggedIn: false,
  page: "landing",
  authMode: "login",
  mobileNavOpen: false,
  postLoginPage: "home",
  selectedCourse: "Web Technology",
  courseTab: "Announcements",
  dropdownOpen: false,
  materialOpen: {},
  assignmentOpen: {},
  announcementCommentOpen: {},
  announcementSaved: {},
  announcementCommentDrafts: {},
  announcementComments: {},
  showAllNotifications: false,
  forumSearch: "",
  forumSort: "latest",
  forumTag: "All",
  forumComposerOpen: false,
  forumDraft: "",
  forumReplyTo: null,
  forumReplyDraft: "",
  courseFilter: "all",
  courseSearch: "",
  courseSort: "progress",
  bookFilters: {
    country: "All",
    area: "All",
    type: "All",
    minPrice: 0,
    maxPrice: 200,
  },
  bookSearch: "",
  bookSort: "featured",
  bookTag: "Featured",
  cart: {},
  previewBook: null,
  notificationsOpen: false,
  toasts: [],
  forumViewingPost: null,
  selectedMcqOption: {},
  commentDrafts: {},
  commentsByKey: {},
  shortAnswerDrafts: {},
  assignmentSubmissions: {},
  materialSeed: 0,
  bootstrapLoaded: false,
  profileDraft: {
    name: "User",
    email: "123@gmail.com",
    bio: "I am passionate about learning new technologies.",
  },
  settingsDraft: {
    language: "English",
    theme: "Light",
    notificationPref: "All notifications",
  },
  paymentDraft: {
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  },
};

const data = {
  user: { name: "User", email: "123@gmail.com" },
  lecturer: { name: "Dr. Nur Aisyah", avatar: "👩‍🏫" },
  courses: [
    { name: "Web Technology", category: "Computer Science", contentType: "Mixed", progress: 0, message: "Start by today!", icon: "image1.png" },
    { name: "Public speaking", category: "Communication", contentType: "Lecture", progress: 100, message: "Incredible!", icon: "image2.png" },
    { name: "Presentation skill", category: "Communication", contentType: "Workshop", progress: 90, message: "Almost there!", icon: "image3.png" },
    { name: "Calculus", category: "Mathematics", contentType: "Lecture", progress: 24, message: "Keep it up!", icon: "image4.png" },
  ],
  notifications: [
    {
      id: "n1",
      title: "General Alert",
      text: "Web Technology is now unlocked. Please visit the resources section to view it.",
      time: "1:30PM",
      read: false,
    },
    {
      id: "n2",
      title: "Assignment Reminder",
      text: "Group assignment: Create a website due 20 May, 3.00pm.",
      time: "9:00AM",
      read: false,
    },
    {
      id: "n3",
      title: "Briefing",
      text: "Zoom briefing details were posted in announcements.",
      time: "8:20AM",
      read: true,
    },
  ],
  announcements: [
    {
      id: "a1",
      title: "Group assignment submission",
      meta: "posted at 16 May, 7.15pm",
      text: "I would like to apologize for the delay in assigning the case study. Kindly find the link and inform me if any group is missing.",
    },
    {
      id: "a2",
      title: "Briefing details",
      meta: "posted at 10 May, 3.27pm",
      text: "Date: 6th March 2026, Friday. Time: 8.30pm. Meeting ID: 942 3347 6657. Passcode: 787403.",
    },
    {
      id: "a3",
      title: "Welcome to the course",
      meta: "posted at 02 May, 9.00am",
      text: "Welcome to UCS3142 Academic English (Semester 2, Session 25/26)!",
    },
  ],
  materials: [
    { id: "m1", name: "Chapter 1: Introduction Slides", type: "PPT", filePath: "sample-materials/chapter-1-introduction.ppt" },
    { id: "m2", name: "Group formation namelist", type: "XLS", filePath: "sample-materials/group-formation-namelist.xls" },
    { id: "m3", name: "Chapter 2: Hypertext markup notes", type: "PDF", filePath: "sample-materials/chapter-2-hypertext-markup.pdf" },
    { id: "m4", name: "Chapter 3: Introduction handout", type: "W", filePath: "sample-materials/chapter-3-introduction.doc" },
  ],
  assignments: [
    { id: "mcq", title: "Which coding language would you choose to do your assignment?", due: "12 June, 11.59pm", dueAt: "2026-06-12T23:59:00", type: "mcq" },
    { id: "upload", title: "Group assignment: Create a website", due: "20 May, 3.00pm", dueAt: "2026-05-20T15:00:00", type: "upload" },
    { id: "short", title: "Progress test: Short quiz", due: "No due date", dueAt: null, type: "short" },
  ],
  forum: [
    {
      title: "How to use React",
      author: "Jason",
      avatar: "J",
      replies: 5,
      tag: "Web",
      pinned: true,
      likes: 24,
      last: "10 mins ago",
      content: "I am struggling with component state management and prop drilling. Any practical learning path?",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Best resources for learning Python?",
      author: "Timothy",
      avatar: "T",
      replies: 3,
      tag: "Programming",
      pinned: false,
      likes: 13,
      last: "22 mins ago",
      content: "Looking for project-based resources that can help me move from beginner to intermediate quickly.",
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Database optimization tips?",
      author: "Eric",
      avatar: "E",
      replies: 7,
      tag: "Database",
      pinned: false,
      likes: 31,
      last: "1 hour ago",
      content: "Our query latency is getting high after data growth. What indexing strategy should I start with?",
      image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1000&q=80",
    },
    {
      title: "Best way to prepare for short quiz?",
      author: "Aina",
      avatar: "A",
      replies: 4,
      tag: "Tips",
      pinned: false,
      likes: 18,
      last: "2 hours ago",
      content: "Share your quick revision plan before quiz day. I need something practical for 2-3 days prep.",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1000&q=80",
    },
  ],
  books: [
    {
      title: "Web Development with HTML, CSS, JS",
      price: 39,
      country: "Malaysia",
      area: "Klang Valley",
      type: "Book",
      category: "Web Dev",
      image:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Public Speaking for Students",
      price: 32,
      country: "Singapore",
      area: "Central",
      type: "Book",
      category: "Communication",
      image:
        "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Calculus Practice Workbook",
      price: 41,
      country: "Malaysia",
      area: "Johor",
      type: "Workbook",
      category: "Math",
      image:
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Modern Database Design",
      price: 59,
      country: "Indonesia",
      area: "Jakarta",
      type: "E-Book",
      category: "Database",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Programming Patterns Guide",
      price: 68,
      country: "Malaysia",
      area: "Penang",
      type: "Book",
      category: "Programming",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Presentation Skills Toolkit",
      price: 27,
      country: "Thailand",
      area: "Bangkok",
      type: "PDF Pack",
      category: "Presentation",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    },
  ],
};

// 保留一份前端原始课程内容快照，后端某模块没数据时回退使用。
const seedCourseContent = {
  announcements: data.announcements.map((x) => ({ ...x })),
  materials: data.materials.map((x) => ({ ...x })),
  assignments: data.assignments.map((x) => ({ ...x })),
};

const API_BASE = "https://web-production-679f6.up.railway.app";

function deriveUsername(email) {
  return String(email || "").split("@")[0].trim() || "user";
}

async function apiJson(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  let body = {};
  try {
    body = await res.json();
  } catch {
    body = {};
  }
  return { ok: res.ok, status: res.status, body };
}

async function getCurrentUser() {
  const { ok, body } = await apiJson("/user", { method: "GET" });
  if (!ok) return body;
  return body;
}

function hydrateFromBootstrap(payload) {
  const d = payload || {};
  if (d.user) {
    data.user = {
      name: d.user.name || d.user.username || "User",
      email: d.user.email || data.user.email,
    };
    state.profileDraft.name = data.user.name;
    state.profileDraft.email = data.user.email;
  }
  if (Array.isArray(d.courses) && d.courses.length) {
    data.courses = d.courses;
    state.selectedCourse = d.courses[0].name;
  }
  if (Array.isArray(d.notifications)) data.notifications = d.notifications;
  if (Array.isArray(d.announcements)) data.announcements = d.announcements;
  if (Array.isArray(d.materials)) data.materials = d.materials;
  if (Array.isArray(d.assignments)) data.assignments = d.assignments;
  if (Array.isArray(d.forum) && d.forum.length) data.forum = d.forum;
  // 数据库优先：使用后端返回 image_url；仅在空值时使用前端兜底图。
  if (Array.isArray(d.books) && d.books.length) {
    const existingByTitle = new Map(data.books.map((b) => [b.title, b]));
    const fallbackImages = [
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80",
    ];
    data.books = d.books.map((book, idx) => {
      const old = existingByTitle.get(book.title) || {};
      return {
        ...old,
        ...book,
        image: book.image || old.image || fallbackImages[idx % fallbackImages.length],
      };
    });
  }
  if (d.cart && typeof d.cart === "object") state.cart = d.cart;
  if (Array.isArray(d.course_comments)) {
    state.announcementComments = {};
    state.commentsByKey = {};
    d.course_comments.forEach((c) => {
      const key = String(c.section_key || "");
      const item = {
        author: c.author || "Student",
        text: c.content || "",
        time: c.created_at ? "Just now" : "Just now",
      };
      if (key.startsWith("announcement:")) {
        const aid = key.replace("announcement:", "");
        if (!state.announcementComments[aid]) state.announcementComments[aid] = [];
        state.announcementComments[aid].push(item);
      } else if (key) {
        if (!state.commentsByKey[key]) state.commentsByKey[key] = [];
        state.commentsByKey[key].push(item);
      }
    });
  }
  state.bootstrapLoaded = true;
}

async function loadBootstrap() {
  const { ok, body } = await apiJson("/bootstrap", { method: "GET" });
  if (ok && body.status === "success") {
    hydrateFromBootstrap(body.data);
    return { status: "success" };
  }
  return body;
}

async function loginUser(payload) {
  const username = deriveUsername(payload.email);
  const { ok, body } = await apiJson("/login", {
    method: "POST",
    body: JSON.stringify({ username, password: payload.password }),
  });
  if (!ok) return body;
  const me = await getCurrentUser();
  if (me.status === "success") {
    await loadBootstrap();
    return me;
  }
  return { status: "success", user: { username } };
}

async function registerUser(payload) {
  const username = deriveUsername(payload.email);
  const reg = await apiJson("/register", {
    method: "POST",
    body: JSON.stringify({ username, password: payload.password }),
  });
  if (!reg.ok) return reg.body;
  const login = await loginUser(payload);
  if (login.status === "success") return login;
  return { status: "success", user: { username } };
}

async function checkoutOrder(payload) {
  const { ok, body } = await apiJson("/checkout", {
    method: "POST",
    body: JSON.stringify(payload || {}),
  });
  if (!ok) return body;
  return body;
}

function validateEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

function pushToast(type, message, duration = 2800) {
  const toast = { id: `t${Date.now()}${Math.random()}`, type, message };
  state.toasts.push(toast);
  render();
  if (duration > 0) setTimeout(() => dismissToast(toast.id), duration);
}

function dismissToast(id) {
  state.toasts = state.toasts.filter((t) => t.id !== id);
  render();
}

function setPreLoginPage(page) {
  state.page = page;
  state.mobileNavOpen = false;
  render();
}

function setAuthMode(mode) {
  state.authMode = mode;
  render();
}

async function setPostLoginPage(page) {
  if (state.isLoggedIn && !state.bootstrapLoaded) {
    await loadBootstrap();
  }
  state.postLoginPage = page;
  state.dropdownOpen = false;
  state.notificationsOpen = false;
  state.mobileNavOpen = false;
  if (page !== "forum") state.forumViewingPost = null;
  render();
}

function toggleMobileNav() {
  state.mobileNavOpen = !state.mobileNavOpen;
  render();
}

function setCourseTab(tab) {
  state.courseTab = tab;
  render();
}

function setCourse(courseName) {
  state.selectedCourse = courseName;
  state.postLoginPage = "courseDetail";
  render();
}

function getSelectedCourse() {
  return data.courses.find((c) => c.name === state.selectedCourse) || null;
}

function getSelectedCourseId() {
  const selected = getSelectedCourse();
  return selected && selected.id ? selected.id : null;
}

async function login(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const formData = new FormData(form);
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();

  if (!email || !password) {
    pushToast("error", "Please fill in email and password.");
    return;
  }
  if (!validateEmail(email)) {
    pushToast("error", "Invalid email format.");
    return;
  }

  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Loading...";
  pushToast("loading", "Processing login...", 900);
  try {
    const res = await loginUser({ email, password });
    if (res.status === "success") {
      const user = res.user || {};
      data.user = {
        name: user.username || user.name || deriveUsername(email),
        email,
      };
      state.isLoggedIn = true;
      state.postLoginPage = "home";
      addNotification("Login", "Login successful.");
      pushToast("success", "Login successful.");
      render();
    } else {
      pushToast("error", res.message || "Invalid credentials.");
    }
  } catch {
    pushToast("error", "Login failed.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
}

async function register(event) {
  event.preventDefault();
  const form = event.target;
  const submitBtn = form.querySelector("button[type='submit']");
  const formData = new FormData(form);
  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "").trim();
  const confirmPassword = String(formData.get("confirmPassword") || "").trim();

  if (!name || !email || !password || !confirmPassword) {
    pushToast("error", "Please complete all register fields.");
    return;
  }
  if (!validateEmail(email)) {
    pushToast("error", "Invalid email format.");
    return;
  }
  if (password.length < 6) {
    pushToast("error", "Password must be at least 6 characters.");
    return;
  }
  if (password !== confirmPassword) {
    pushToast("error", "Password confirmation does not match.");
    return;
  }

  const original = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = "Loading...";
  pushToast("loading", "Creating account...", 900);
  try {
    const res = await registerUser({ name, email, password });
    if (res.status === "success") {
      const user = res.user || {};
      data.user = {
        name: user.username || user.name || name || deriveUsername(email),
        email,
      };
      state.isLoggedIn = true;
      state.postLoginPage = "home";
      addNotification("Registration", "Account created successfully.");
      pushToast("success", "Registration successful.");
      render();
    } else {
      pushToast("error", res.message || "Registration failed.");
    }
  } catch {
    pushToast("error", "Registration failed.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = original;
  }
}

function logout() {
  state.isLoggedIn = false;
  state.bootstrapLoaded = false;
  state.page = "landing";
  state.authMode = "login";
  state.courseTab = "Announcements";
  state.dropdownOpen = false;
  render();
}

function toggleDropdown() {
  state.dropdownOpen = !state.dropdownOpen;
  render();
}

function toggleMaterial(index) {
  state.materialOpen[index] = !state.materialOpen[index];
  render();
}

function toggleAssignment(id) {
  state.assignmentOpen[id] = !state.assignmentOpen[id];
  render();
}

function toggleNotifications() {
  state.showAllNotifications = !state.showAllNotifications;
  render();
}

function toggleAnnouncementComment(id) {
  const wasOpen = !!state.announcementCommentOpen[id];
  Object.keys(state.announcementCommentOpen).forEach((key) => {
    state.announcementCommentOpen[key] = false;
  });
  state.announcementCommentOpen[id] = !wasOpen;
  render();
}

function toggleAnnouncementSave(id) {
  state.announcementSaved[id] = !state.announcementSaved[id];
  if (state.announcementSaved[id]) {
    addNotification("Announcement Saved", "Added to your reminders.");
    pushToast("success", "Announcement saved.");
  } else {
    addNotification("Announcement Unsaved", "Removed from your reminders.");
    pushToast("info", "Announcement removed from reminders.");
  }
  render();
}

function updateAnnouncementCommentDraft(id, value) {
  state.announcementCommentDrafts[id] = value;
}

async function postAnnouncementComment(id) {
  const text = String(state.announcementCommentDrafts[id] || "").trim();
  if (!text) {
    pushToast("error", "Please write a comment first.");
    return;
  }
  const selectedCourseId = getSelectedCourseId();
  const create = await apiJson("/comments", {
    method: "POST",
    body: JSON.stringify({
      section_key: `announcement:${id}`,
      course_id: selectedCourseId,
      content: text,
    }),
  });
  if (!create.ok) {
    pushToast("error", create.body.message || "Failed to post comment.");
    return;
  }
  if (!state.announcementComments[id]) {
    state.announcementComments[id] = [];
  }
  state.announcementComments[id].push({
    author: data.user.name || "Student",
    text,
    time: "Just now",
  });
  state.announcementCommentDrafts[id] = "";
  addNotification("Announcement Comment", "Your comment has been posted.");
  pushToast("success", "Comment posted.");
  render();
}

function updateForumSearch(value) {
  state.forumSearch = value;
  render();
}

function updateForumSort(value) {
  state.forumSort = value;
  render();
}

function updateForumTag(value) {
  state.forumTag = value;
  render();
}

function setBookFilter(key, value) {
  state.bookFilters[key] = value;
  render();
}

function unreadNotificationsCount() {
  return data.notifications.filter((n) => !n.read).length;
}

function addNotification(title, text) {
  const item = {
    id: `n${Date.now()}`,
    title,
    text,
    time: "Just now",
    read: false,
  };
  data.notifications.unshift(item);
}

function openNotificationsCenter() {
  state.notificationsOpen = !state.notificationsOpen;
  render();
}

function markAllNotificationsRead() {
  data.notifications.forEach((n) => {
    n.read = true;
  });
  render();
}

function markNotificationRead(id) {
  const item = data.notifications.find((n) => n.id === id);
  if (!item) return;
  item.read = true;
  render();
}

async function addToCart(bookTitle) {
  const nextQty = (state.cart[bookTitle] || 0) + 1;
  const res = await apiJson("/cart/items", {
    method: "POST",
    body: JSON.stringify({ title: bookTitle, quantity: nextQty }),
  });
  if (!res.ok) {
    pushToast("error", "Failed to add to cart.");
    return;
  }
  state.cart[bookTitle] = nextQty;
  addNotification("Cart Updated", `${bookTitle} was added to your cart.`);
  pushToast("success", `${bookTitle} added to cart.`);
  render();
}

async function removeFromCart(bookTitle) {
  const res = await apiJson("/cart/items", {
    method: "POST",
    body: JSON.stringify({ title: bookTitle, quantity: 0 }),
  });
  if (!res.ok) {
    pushToast("error", "Failed to remove item.");
    return;
  }
  delete state.cart[bookTitle];
  pushToast("success", "Item removed from cart.");
  render();
}

async function changeCartQty(bookTitle, delta) {
  const nextQty = (state.cart[bookTitle] || 0) + delta;
  const res = await apiJson("/cart/items", {
    method: "POST",
    body: JSON.stringify({ title: bookTitle, quantity: Math.max(nextQty, 0) }),
  });
  if (!res.ok) {
    pushToast("error", "Failed to update quantity.");
    return;
  }
  if (nextQty <= 0) {
    delete state.cart[bookTitle];
  } else {
    state.cart[bookTitle] = nextQty;
  }
  render();
}

async function clearCart() {
  const res = await apiJson("/cart/clear", { method: "POST", body: "{}" });
  if (!res.ok) {
    pushToast("error", "Failed to clear cart.");
    return;
  }
  state.cart = {};
  pushToast("success", "Cart cleared.");
  render();
}

function checkoutCart() {
  const itemsCount = Object.values(state.cart).reduce((a, b) => a + b, 0);
  if (itemsCount === 0) {
    addNotification("Checkout", "Your cart is empty.");
    pushToast("error", "Your cart is empty.");
  } else {
    addNotification("Checkout", `Proceed to payment for ${itemsCount} item(s).`);
    pushToast("success", "Redirecting to payment...");
    state.postLoginPage = "payment";
  }
  render();
}

function previewBook(bookTitle) {
  state.previewBook = bookTitle;
  addNotification("Book Preview", `You opened preview for ${bookTitle}.`);
  render();
}

function closePreview() {
  state.previewBook = null;
  render();
}

function askQuestion() {
  state.forumComposerOpen = !state.forumComposerOpen;
  render();
}

function viewPost(title) {
  addNotification("Forum", `Viewing post: ${title}`);
  state.forumViewingPost = title;
  render();
}

function replyPost(title) {
  state.forumReplyTo = title;
  state.forumReplyDraft = "";
  render();
}

async function saveProfile() {
  const name = state.profileDraft.name.trim() || data.user.name;
  const email = state.profileDraft.email.trim() || data.user.email;
  const res = await apiJson("/profile", {
    method: "POST",
    body: JSON.stringify({ name, email }),
  });
  if (!res.ok) {
    pushToast("error", res.body.message || "Profile update failed.");
    return;
  }
  data.user.name = name;
  data.user.email = email;
  addNotification("Profile", "Your profile changes were saved.");
  pushToast("success", "Profile updated.");
  render();
}

function updateSettings() {
  addNotification("Settings", `Language: ${state.settingsDraft.language}, Theme: ${state.settingsDraft.theme}.`);
  pushToast("success", "Settings updated.");
  render();
}

function updateProfileField(key, value) {
  state.profileDraft[key] = value;
}

function updateSettingsField(key, value) {
  state.settingsDraft[key] = value;
}

function setCourseFilter(value) {
  state.courseFilter = value;
  render();
}

function setCourseSearch(value) {
  state.courseSearch = value;
  render();
}

function setCourseSort(value) {
  state.courseSort = value;
  render();
}

function openCourseResources(courseName) {
  setCourse(courseName);
  state.courseTab = "Material";
  addNotification("Course Resources", `Opened resources for ${courseName}.`);
  pushToast("info", `Viewing ${courseName} materials.`);
  render();
}

function selectMcqOption(assignmentId, option) {
  state.selectedMcqOption[assignmentId] = option;
  render();
}

function submitMcqAnswer(assignmentId) {
  const selected = state.selectedMcqOption[assignmentId];
  if (!selected) {
    pushToast("error", "Please select an option first.");
    return;
  }
  submitAssignment(assignmentId, `MCQ answer (${selected})`);
}

function updateCommentDraft(key, value) {
  state.commentDrafts[key] = value;
}

function updateShortAnswerDraft(assignmentId, value) {
  state.shortAnswerDrafts[assignmentId] = value;
}

function generateRandomMaterialSample() {
  const templates = [
    { type: "PPT", filePath: "sample-materials/chapter-1-introduction.ppt", baseName: "Lecture Slides" },
    { type: "XLS", filePath: "sample-materials/group-formation-namelist.xls", baseName: "Attendance Sheet" },
    { type: "PDF", filePath: "sample-materials/chapter-2-hypertext-markup.pdf", baseName: "Study Notes" },
    { type: "W", filePath: "sample-materials/chapter-3-introduction.doc", baseName: "Class Handout" },
  ];
  const picked = templates[Math.floor(Math.random() * templates.length)];
  state.materialSeed += 1;
  const item = {
    id: `m${Date.now()}`,
    name: `${picked.baseName} ${state.materialSeed}`,
    type: picked.type,
    filePath: picked.filePath,
  };
  data.materials.unshift(item);
  addNotification("Material", `${item.name} sample file created.`);
  pushToast("success", `${item.name} added.`);
  render();
}

function updateForumDraft(value) {
  state.forumDraft = value;
}

function forumSampleImage() {
  const images = [
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80",
  ];
  return images[Math.floor(Math.random() * images.length)];
}

async function submitForumQuestion() {
  const text = state.forumDraft.trim();
  if (!text) {
    pushToast("error", "Please write your question first.");
    return;
  }
  const create = await apiJson("/forum/posts", {
    method: "POST",
    body: JSON.stringify({ title: text, content: text }),
  });
  if (!create.ok) {
    pushToast("error", create.body.message || "Failed to post question.");
    return;
  }
  data.forum.unshift({
    title: text,
    author: data.user.name || "You",
    avatar: String((data.user.name || "U")[0] || "U").toUpperCase(),
    replies: 0,
    tag: state.forumTag === "All" ? "Tips" : state.forumTag,
    pinned: false,
    likes: 0,
    last: "Just now",
    content: text,
    image: forumSampleImage(),
  });
  state.forumDraft = "";
  state.forumComposerOpen = false;
  addNotification("Forum", "Question posted successfully.");
  pushToast("success", "Question posted.");
  render();
}

function updateForumReply(value) {
  state.forumReplyDraft = value;
}

async function submitForumReply() {
  const text = state.forumReplyDraft.trim();
  if (!state.forumReplyTo || !text) {
    pushToast("error", "Please write a reply first.");
    return;
  }
  const reply = await apiJson("/forum/replies", {
    method: "POST",
    body: JSON.stringify({ post_title: state.forumReplyTo, content: text }),
  });
  if (!reply.ok) {
    pushToast("error", reply.body.message || "Failed to post reply.");
    return;
  }
  const post = data.forum.find((p) => p.title === state.forumReplyTo);
  if (post) {
    post.replies += 1;
    post.last = "Just now";
  }
  addNotification("Forum", `Reply posted to "${state.forumReplyTo}".`);
  pushToast("success", "Reply posted.");
  state.forumReplyTo = null;
  state.forumReplyDraft = "";
  render();
}

function cancelForumReply() {
  state.forumReplyTo = null;
  state.forumReplyDraft = "";
  render();
}

function setBookSearch(value) {
  state.bookSearch = value;
  render();
}

function setBookSort(value) {
  state.bookSort = value;
  render();
}

function setBookTag(value) {
  state.bookTag = value;
  render();
}

function submitAction(actionName) {
  addNotification("Submission", `${actionName} completed.`);
  pushToast("success", `${actionName} completed.`);
  render();
}

async function postComment(key) {
  const text = String(state.commentDrafts[key] || "").trim();
  if (!text) {
    pushToast("error", "Please type a comment first.");
    return;
  }
  const selectedCourseId = getSelectedCourseId();
  const create = await apiJson("/comments", {
    method: "POST",
    body: JSON.stringify({
      section_key: key,
      course_id: selectedCourseId,
      content: text,
    }),
  });
  if (!create.ok) {
    pushToast("error", create.body.message || "Failed to post comment.");
    return;
  }
  if (!state.commentsByKey[key]) {
    state.commentsByKey[key] = [];
  }
  state.commentsByKey[key].push({
    author: data.user.name || "Student",
    text,
    time: "Just now",
  });
  addNotification("Comment", `Comment posted in ${key.replace(/-/g, " ")}.`);
  pushToast("success", "Comment posted.");
  state.commentDrafts[key] = "";
  render();
}

function formatSubmittedTime(ts) {
  return new Date(ts).toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getAssignmentClientKey(assignment) {
  const cid = assignment && assignment.course_id != null ? assignment.course_id : "seed";
  const aid = assignment && assignment.id ? assignment.id : assignment?.title || "unknown";
  return `${cid}:${aid}`;
}

function findAssignmentByClientKey(clientKey) {
  const assignmentSource =
    Array.isArray(data.assignments) && data.assignments.length
      ? data.assignments
      : seedCourseContent.assignments;
  return assignmentSource.find((a) => getAssignmentClientKey(a) === clientKey) || null;
}

async function submitAssignment(assignmentClientKey, sourceLabel) {
  const assignment = findAssignmentByClientKey(assignmentClientKey);
  if (!assignment) return;
  if (assignment.type === "short" && !String(state.shortAnswerDrafts[assignmentClientKey] || "").trim()) {
    pushToast("error", "Please write your short answer before submitting.");
    return;
  }
  const now = Date.now();
  const dueAt = assignment.dueAt ? new Date(assignment.dueAt).getTime() : null;
  const isLate = dueAt ? now > dueAt : false;
  const submitRes = await apiJson("/assignments/submit", {
    method: "POST",
    body: JSON.stringify({
      assignment_id: assignment.assignment_id || null,
      title: assignment.title,
      source_label: sourceLabel,
      text_answer:
        assignment.type === "short"
          ? String(state.shortAnswerDrafts[assignmentClientKey] || "").trim()
          : null,
    }),
  });
  if (!submitRes.ok) {
    pushToast("error", submitRes.body.message || "Failed to submit assignment.");
    return;
  }
  state.assignmentSubmissions[assignmentClientKey] = {
    submittedAt: now,
    isLate,
    sourceLabel,
  };
  addNotification(
    "Assignment Submitted",
    `${assignment.title} submitted${isLate ? " (Late)" : ""}.`
  );
  pushToast(
    isLate ? "info" : "success",
    `${assignment.title} submitted${isLate ? " (Late)" : ""}.`
  );
  render();
}

function resetBookFilters() {
  state.bookFilters = {
    country: "All",
    area: "All",
    type: "All",
    minPrice: 0,
    maxPrice: 200,
  };
  state.bookSearch = "";
  state.bookSort = "featured";
  state.bookTag = "Featured";
  pushToast("success", "Filters reset.");
  render();
}

function updatePaymentField(key, value) {
  if (key === "cardNumber") {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    state.paymentDraft[key] = digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    return;
  }
  if (key === "expiry") {
    const digits = value.replace(/\D/g, "").slice(0, 4);
    state.paymentDraft[key] = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    return;
  }
  if (key === "cvc") {
    state.paymentDraft[key] = value.replace(/\D/g, "").slice(0, 3);
    return;
  }
  state.paymentDraft[key] = value;
}

async function processPayment(event) {
  event.preventDefault();
  const btn = event.target.querySelector("button[type='submit']");
  const { fullName, email, cardNumber, expiry, cvc } = state.paymentDraft;
  if (!fullName || !email || !cardNumber || !expiry || !cvc) {
    pushToast("error", "Please complete all payment fields.");
    return;
  }
  if (!validateEmail(email)) {
    pushToast("error", "Invalid email format.");
    return;
  }
  const original = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Loading...";
  pushToast("loading", "Processing payment...", 1000);
  try {
    const res = await checkoutOrder({ ...state.paymentDraft, cart: state.cart });
    if (res.status === "success") {
      addNotification("Payment Success", `Order ${res.orderId} paid successfully.`);
      pushToast("success", `Payment success: ${res.orderId}`);
      state.cart = {};
      state.paymentDraft = { fullName: "", email: "", cardNumber: "", expiry: "", cvc: "" };
      state.postLoginPage = "bookstore";
      render();
    } else {
      pushToast("error", "Payment failed.");
    }
  } catch {
    pushToast("error", "Payment failed.");
  } finally {
    btn.disabled = false;
    btn.textContent = original;
  }
}

function imagePlaceholder(label, className = "") {
  return `<div class="image-placeholder ${className}">${label}</div>`;
}

function ringProgress(value) {
  return `
    <div class="ring" style="--p:${value};">
      <div class="ring-inner">${value}%</div>
    </div>
  `;
}

function nav() {
  const tabs = ["home", "courses", "forum", "bookstore"];
  const unread = unreadNotificationsCount();
  return `
    <nav class="navbar">
      <div class="brand-wrap clickable-brand" onclick="setPostLoginPage('home')">
        <img src="logo.png" alt="EDUTECH logo" class="logo-img" />
        <div class="logo logo-large">
          <span class="logo-mark">EDU</span>
          <span class="logo-text">TECH</span>
        </div>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation menu" onclick="toggleMobileNav()">☰</button>
      <div class="nav-links ${state.mobileNavOpen ? "mobile-nav-open" : ""}">
        ${tabs
          .map(
            (tab) =>
              `<button class="nav-link ${state.postLoginPage === tab || (tab === "courses" && state.postLoginPage === "courseDetail") ? "active" : ""}" onclick="setPostLoginPage('${tab}')">${
                tab.charAt(0).toUpperCase() + tab.slice(1)
              }</button>`
          )
          .join("")}
      </div>
      <div class="user-wrap">
        <button class="mail-button" title="Notifications" onclick="openNotificationsCenter()">✉${unread ? `<span class="mail-badge">${unread}</span>` : ""}</button>
        <div class="notification-pop ${state.notificationsOpen ? "" : "hidden"}">
          <div class="split">
            <strong>Notifications</strong>
            <button class="button button-secondary compact-btn" onclick="markAllNotificationsRead()">Mark all</button>
          </div>
          <div class="notification-list">
            ${data.notifications
              .slice(0, 6)
              .map(
                (n) => `
              <article class="item notification-item ${n.read ? "" : "notification-unread"}">
                <div class="split">
                  <strong>${n.title}</strong>
                  <small>${n.time}</small>
                </div>
                <p class="muted">${n.text}</p>
                ${n.read ? "" : `<button class="button button-secondary compact-btn" onclick="markNotificationRead('${n.id}')">Mark read</button>`}
              </article>`
              )
              .join("")}
          </div>
        </div>
        <button class="user-button" onclick="toggleDropdown()">
          <span class="avatar-sample">U</span>
        </button>
        <div class="user-dropdown ${state.dropdownOpen ? "" : "hidden"}">
          <button class="dropdown-item" onclick="setPostLoginPage('profile')">Account Profile</button>
          <button class="dropdown-item" onclick="setPostLoginPage('profile')">Settings</button>
          <button class="dropdown-item" onclick="logout()">Log out</button>
        </div>
      </div>
    </nav>
  `;
}

function landingView() {
  return `
    <div class="page fixed-frame">
      <nav class="navbar landing-navbar">
        <div class="brand-wrap">
          <img src="logo.png" alt="EDUTECH logo" class="logo-img logo-img-large" />
          <div class="logo logo-large">
            <span class="logo-mark">EDU</span>
            <span class="logo-text">TECH</span>
          </div>
        </div>
        <div class="nav-links"><!-- pre-login: links hidden --></div>
        <button class="button button-primary" onclick="setPreLoginPage('auth')">Login / Sign up</button>
      </nav>

      <section class="hero landing-hero">
        <div class="card landing-hero-card">
          <h1 class="hero-title landing-hero-title">Learn Smarter, Anywhere</h1>
          <p class="muted">Your all-in-one online learning platform.</p>
          <button class="button button-primary" onclick="setPreLoginPage('auth')">Get started</button>
        </div>
        <div class="card landing-hero-image-card">
          <img src="image1.png" alt="Learning illustration" class="hero-image-fit landing-hero-image" />
        </div>
      </section>
      <section class="grid-3 section-gap">
        <article class="card quick-card centered-card">
          <img src="image2.png" alt="Explore courses" class="quick-image-fit" />
          <h4 class="center-text">Explore courses</h4>
        </article>
        <article class="card quick-card centered-card">
          <img src="image3.png" alt="Join forum" class="quick-image-fit" />
          <h4 class="center-text">Join the forum</h4>
        </article>
        <article class="card quick-card centered-card">
          <img src="image4.png" alt="Visit bookstore" class="quick-image-fit" />
          <h4 class="center-text">Visit Bookstore</h4>
        </article>
      </section>
      <footer class="copyright">© 2026 EDUTECH. All rights reserved.</footer>
    </div>
  `;
}

function authView() {
  return `
    <main class="auth-wrap fixed-frame auth-background">
      <form class="card auth-card" data-auth-form="1">
        <div class="auth-switch">
          <button type="button" class="tag-btn ${state.authMode === "login" ? "active-tag" : ""}" onclick="setAuthMode('login')">Login</button>
          <button type="button" class="tag-btn ${state.authMode === "register" ? "active-tag" : ""}" onclick="setAuthMode('register')">Register</button>
        </div>
        <h2>${state.authMode === "login" ? "Login" : "Create Account"}</h2>
        <p class="muted">${state.authMode === "login" ? "Welcome back, continue your learning journey." : "Join EduTech to start learning smarter."}</p>
        ${
          state.authMode === "register"
            ? `<div class="field">
                <label>Full Name</label>
                <input type="text" name="name" placeholder="Your full name" required />
              </div>`
            : ""
        }
        <div class="field">
          <label>Email</label>
          <input type="email" name="email" placeholder="123@gmail.com" value="${data.user.email}" required />
        </div>
        <div class="field">
          <label>Password</label>
          <input type="password" name="password" placeholder="12345678" value="12345678" required />
        </div>
        ${
          state.authMode === "register"
            ? `<div class="field">
                <label>Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Re-enter password" required />
              </div>`
            : ""
        }
        <button class="button button-primary" type="submit">${state.authMode === "login" ? "Login" : "Register"}</button>
      </form>
    </main>
  `;
}

function bindAuthForm() {
  const authForm = document.querySelector("[data-auth-form='1']");
  if (!authForm || authForm.dataset.boundAuthSubmit) return;
  authForm.dataset.boundAuthSubmit = "1";
  authForm.addEventListener("submit", (event) => {
    if (state.authMode === "register") register(event);
    else login(event);
  });
}

function homeView() {
  const overall = Math.round(
    data.courses.reduce((total, item) => total + item.progress, 0) / data.courses.length
  );

  return `
    <div class="page wide-page fixed-frame">
    ${nav()}
    <section class="dashboard-stats">
      <article class="card stat-card">
        <div class="stat-label">Overall Progress</div>
        <div class="stat-big">${overall}%</div>
      </article>
      <article class="card stat-card">
        <div class="stat-label">Active Courses</div>
        <div class="stat-big">${data.courses.length}</div>
      </article>
      <article class="card stat-card">
        <div class="stat-label">Assignments</div>
        <div class="stat-big">${data.assignments.length}</div>
      </article>
      <article class="card stat-card">
        <div class="stat-label">Unread Alerts</div>
        <div class="stat-big">${unreadNotificationsCount()}</div>
      </article>
    </section>

    <section class="dashboard-grid">
      <div class="card">
        <h2>Student Overview</h2>
        <div class="overview-block">
          ${ringProgress(overall)}
          <div>
            <strong>Overall Student Progress</strong>
            <p class="muted">You've completed ${overall}% of your classes' overall assigned coursework.</p>
            <div class="button-row">
              <button class="button button-primary" onclick="setPostLoginPage('courses')">Continue Learning</button>
              <button class="button button-secondary" onclick="setPostLoginPage('courseDetail')">Open Course Detail</button>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>Course Progress</h3>
        <div class="course-progress-list">
          ${data.courses
            .map(
              (course) => `
              <div class="progress-row">
                <span>${course.name}</span>
                <strong>${course.progress}%</strong>
              </div>`
            )
            .join("")}
        </div>
      </div>

      <div class="card">
        <h3>Upcoming Deadlines</h3>
        ${data.assignments
          .map(
            (a) =>
              `<div class="progress-row deadline-row"><span class="deadline-title">${a.title}</span><span class="muted deadline-due">Due ${a.due}</span></div>`
          )
          .join("")}
      </div>

      <div class="card">
        <div class="split">
          <h3 style="margin:0;">Notifications</h3>
          <span class="mail-icon">✉</span>
        </div>
        ${(state.showAllNotifications ? data.notifications : data.notifications.slice(0, 2))
          .map((n) => `<div class="item"><strong>${n.title}</strong><p class="muted">${n.text}</p><small>${n.time}</small></div>`)
          .join("")}
        <button class="button button-secondary" onclick="toggleNotifications()">
          ${state.showAllNotifications ? "Hide Notifications" : "View All Notifications"}
        </button>
      </div>

      <div class="card">
        <h3>Recent Forum Activity</h3>
        ${data.forum
          .slice(0, 3)
          .map(
            (f) =>
              `<div class="progress-row"><span>${f.title}</span><span class="muted">${f.replies} replies</span></div>`
          )
          .join("")}
        <button class="button button-secondary" onclick="setPostLoginPage('forum')">Go to Forum</button>
      </div>

      <div class="card">
        <h3>Quick Actions</h3>
        <div class="button-row">
          <button class="button button-primary" onclick="setPostLoginPage('courses')">My Courses</button>
          <button class="button button-secondary" onclick="setPostLoginPage('bookstore')">Bookstore</button>
          <button class="button button-secondary" onclick="setPostLoginPage('profile')">Account</button>
        </div>
      </div>
    </section>
    </div>
  `;
}

function coursesView() {
  function statusClass(message) {
    if (message.includes("Start")) return "status-red";
    if (message.includes("Keep")) return "status-orange";
    if (message.includes("Almost")) return "status-green";
    return "status-blue";
  }

  let filteredCourses = data.courses.filter((course) =>
    course.name.toLowerCase().includes(state.courseSearch.toLowerCase())
  );
  if (state.courseFilter === "progress") {
    filteredCourses = filteredCourses.filter((c) => c.progress > 0 && c.progress < 100);
  } else if (state.courseFilter === "completed") {
    filteredCourses = filteredCourses.filter((c) => c.progress >= 100);
  } else if (state.courseFilter === "recommended") {
    filteredCourses = filteredCourses.filter((c) => c.progress < 50);
  }
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (state.courseSort === "name-asc") return a.name.localeCompare(b.name);
    if (state.courseSort === "name-desc") return b.name.localeCompare(a.name);
    return b.progress - a.progress;
  });
  const overall = Math.round(
    data.courses.reduce((total, item) => total + item.progress, 0) / data.courses.length
  );
  const completed = data.courses.filter((c) => c.progress >= 100).length;

  return `
    <div class="page wide-page fixed-frame">
    ${nav()}
    <section class="courses-shell courses-redesign-shell">
      <div class="card courses-hero">
        <div>
          <h2>My Courses</h2>
          <p class="muted">Track your learning progress, continue classes, and manage your semester in one place.</p>
          <div class="courses-chip-row">
            <span class="category-label">Active Semester</span>
            <span class="category-label">Personalized Path</span>
            <span class="category-label">Skill Tracking</span>
          </div>
        </div>
        <div class="courses-hero-progress">
          ${ringProgress(overall)}
          <div>
            <strong>${overall}% Overall</strong>
            <p class="muted">${completed}/${data.courses.length} courses completed</p>
          </div>
        </div>
      </div>

      <div class="courses-toolbar">
        <div class="button-row">
          <button class="tag-btn ${state.courseFilter === "all" ? "active-tag" : ""}" onclick="setCourseFilter('all')">All Courses</button>
          <button class="tag-btn ${state.courseFilter === "progress" ? "active-tag" : ""}" onclick="setCourseFilter('progress')">In Progress</button>
          <button class="tag-btn ${state.courseFilter === "completed" ? "active-tag" : ""}" onclick="setCourseFilter('completed')">Completed</button>
          <button class="tag-btn ${state.courseFilter === "recommended" ? "active-tag" : ""}" onclick="setCourseFilter('recommended')">Recommended</button>
        </div>
        <div class="courses-toolbar-right">
          <input type="text" placeholder="Search courses..." value="${state.courseSearch}" oninput="setCourseSearch(this.value)" />
          <select onchange="setCourseSort(this.value)">
            <option value="progress" ${state.courseSort === "progress" ? "selected" : ""}>Sort: Progress</option>
            <option value="name-asc" ${state.courseSort === "name-asc" ? "selected" : ""}>Sort: Name A-Z</option>
            <option value="name-desc" ${state.courseSort === "name-desc" ? "selected" : ""}>Sort: Name Z-A</option>
          </select>
        </div>
      </div>

      <div class="course-list courses-grid">
        ${sortedCourses
          .map(
            (course) => `
            <article class="card course-card course-card-redesign">
              <div class="course-top-row">
                <img src="${course.icon}" alt="${course.name} icon" class="course-hero-icon" />
                <div class="course-meta">
                  <h4 class="course-title">${course.name}</h4>
                  <p class="muted">Lecturer: ${data.lecturer.name}</p>
                </div>
                <span class="pill ${course.progress >= 100 ? "pill-green" : "pill-amber"}">${course.progress >= 100 ? "Completed" : "Active"}</span>
              </div>
              <div class="course-middle-row">
                <div class="ring ring-large" style="--p:${course.progress};"><div class="ring-inner ring-inner-large">${course.progress}%</div></div>
                <div class="course-action">
                  <p class="status-text ${statusClass(course.message)}">${course.message}</p>
                  <div class="progress-bar-wrap">
                    <div class="progress"><div class="bar" style="width:${course.progress}%"></div></div>
                  </div>
                  <div class="button-row course-buttons">
                    <button class="button button-primary start-btn" onclick="setCourse('${course.name}')">Open Course</button>
                    <button class="button button-secondary" onclick="openCourseResources('${course.name}')">Resources</button>
                  </div>
                </div>
              </div>
            </article>`
          )
          .join("")}
      </div>
    </section>
    </div>
  `;
}

function assignmentOverviewView(assignmentsList) {
  const source = Array.isArray(assignmentsList) ? assignmentsList : data.assignments;
  return `
    ${source
      .map(
        (assignment) => {
          const assignmentClientKey = getAssignmentClientKey(assignment);
          const submission = state.assignmentSubmissions[assignmentClientKey];
          return `
      <article class="card course-tab-card">
        <div class="split">
          <div>
            <strong>${assignment.title}</strong>
            <p class="muted file-meta">Type: ${assignment.type.toUpperCase()}</p>
          </div>
          <span class="pill pill-amber">due ${assignment.due}</span>
        </div>
        ${
          submission
            ? `<div class="assignment-status ${submission.isLate ? "assignment-status-late" : "assignment-status-on-time"}">
                <strong>${submission.isLate ? "Submitted Late" : "Submitted"}</strong>
                <span>${formatSubmittedTime(submission.submittedAt)}</span>
              </div>`
            : ""
        }
        <button class="button button-secondary" onclick="toggleAssignment('${assignmentClientKey}')">${state.assignmentOpen[assignmentClientKey] ? "Collapse" : "Expand"}</button>
        <div class="${state.assignmentOpen[assignmentClientKey] ? "" : "hidden"} assignment-detail">
          ${renderAssignmentBody(assignment, assignmentClientKey)}
        </div>
      </article>
    `;
        }
      )
      .join("")}
  `;
}

function renderAssignmentBody(assignment, assignmentClientKey) {
  const submission = state.assignmentSubmissions[assignmentClientKey];
  const submissionReceipt = submission
    ? `<div class="submission-receipt ${submission.isLate ? "submission-receipt-late" : "submission-receipt-ok"}">
         <strong>${submission.isLate ? "Submitted Late" : "Submitted Successfully"}</strong>
         <p class="muted">Time: ${formatSubmittedTime(submission.submittedAt)} · Via ${submission.sourceLabel}</p>
       </div>`
    : "";

  if (assignment.type === "mcq") {
    return `
      <div class="assignment-instruction">
        <strong>Instructions</strong>
        <p class="muted">Choose one option only and submit your final answer before due time.</p>
      </div>
      <div class="option-grid">
        <button class="option-btn ${state.selectedMcqOption[assignmentClientKey] === "A. HTML" ? "option-btn-selected" : ""}" onclick="selectMcqOption('${assignmentClientKey}', 'A. HTML')">A. HTML</button>
        <button class="option-btn ${state.selectedMcqOption[assignmentClientKey] === "B. XAMPP" ? "option-btn-selected" : ""}" onclick="selectMcqOption('${assignmentClientKey}', 'B. XAMPP')">B. XAMPP</button>
        <button class="option-btn ${state.selectedMcqOption[assignmentClientKey] === "C. VS Code" ? "option-btn-selected" : ""}" onclick="selectMcqOption('${assignmentClientKey}', 'C. VS Code')">C. VS Code</button>
        <button class="option-btn ${state.selectedMcqOption[assignmentClientKey] === "D. Python" ? "option-btn-selected" : ""}" onclick="selectMcqOption('${assignmentClientKey}', 'D. Python')">D. Python</button>
      </div>
      <button class="button button-primary" onclick="submitMcqAnswer('${assignmentClientKey}')">Submit</button>
      ${submissionReceipt}
      ${commentsBlock(`${assignmentClientKey}-comments`)}
    `;
  }

  if (assignment.type === "upload") {
    return `
      <div class="assignment-instruction">
        <strong>Instructions</strong>
        <p class="muted">Upload your project package and mark as done once final files are ready.</p>
      </div>
      <div class="card">
        <h4>Your submission</h4>
        <div class="item">project-demo.mp4</div>
        <div class="item">index.html</div>
        <div class="item"><a href="sample-materials/group-formation-namelist.xls" target="_blank" rel="noopener noreferrer">Open attached resource (XLS)</a></div>
        <div class="button-row">
          <button class="button button-primary" onclick="submitAssignment('${assignmentClientKey}', 'Upload file')">Upload</button>
          <button class="button button-secondary" onclick="submitAssignment('${assignmentClientKey}', 'Mark as Done')">Mark as Done</button>
        </div>
      </div>
      ${submissionReceipt}
      ${commentsBlock(`${assignmentClientKey}-comments`)}
    `;
  }

  return `
    <div class="assignment-instruction">
      <strong>Instructions</strong>
      <p class="muted">Write a short reflection and submit when complete.</p>
    </div>
    <p>What did you learn today? Write down your review here.</p>
    <textarea placeholder="Type your answer here." oninput="updateShortAnswerDraft('${assignmentClientKey}', this.value)">${state.shortAnswerDrafts[assignmentClientKey] || ""}</textarea>
    <button class="button button-primary" onclick="submitAssignment('${assignmentClientKey}', 'Short answer submission')">Submit</button>
    ${submissionReceipt}
    ${commentsBlock(`${assignmentClientKey}-comments`)}
  `;
}

function commentsBlock(key) {
  const postedComments = state.commentsByKey[key] || [];
  return `
    <div class="card comments">
      <div class="comment-head">
        <h4>Class comments</h4>
        <span class="pill pill-amber">Live Discussion</span>
      </div>
      <div class="comment-thread">
        <article class="comment-bubble comment-bubble-student">
          <strong>Student</strong>
          <p>Hi miss. Sorry for disturbing. Do we have class on 27th March?</p>
        </article>
        <article class="comment-bubble comment-bubble-lecturer">
          <strong>Lecturer</strong>
          <p>Yes, we do have.</p>
        </article>
        ${postedComments
          .map(
            (c) => `
          <article class="comment-bubble comment-bubble-student">
            <strong>${c.author}</strong>
            <p>${c.text}</p>
            <small class="muted">${c.time}</small>
          </article>`
          )
          .join("")}
      </div>
      <div class="comment-compose">
        <div class="field">
          <input type="text" placeholder="Leave a comment" value="${state.commentDrafts[key] || ""}" oninput="updateCommentDraft('${key}', this.value)" />
        </div>
        <button class="button button-primary" onclick="postComment('${key}')">Post comment</button>
      </div>
    </div>
  `;
}

function renderCourseTabContent() {
  const selectedCourseId = getSelectedCourseId();
  const selectedAnnouncementsRaw = selectedCourseId
    ? data.announcements.filter((a) => Number(a.course_id) === Number(selectedCourseId))
    : data.announcements;
  const selectedMaterialsRaw = selectedCourseId
    ? data.materials.filter((m) => Number(m.course_id) === Number(selectedCourseId))
    : data.materials;
  const selectedAssignmentsRaw = selectedCourseId
    ? data.assignments.filter((a) => Number(a.course_id) === Number(selectedCourseId))
    : data.assignments;
  // 数据库里该课程暂时没内容时，回退到前端原始示例内容，保证页面可读性。
  const selectedAnnouncements = selectedAnnouncementsRaw.length
    ? selectedAnnouncementsRaw
    : seedCourseContent.announcements;
  const selectedMaterials = selectedMaterialsRaw.length
    ? selectedMaterialsRaw
    : seedCourseContent.materials;
  // assignments 使用“后端优先 + seed 补齐”策略，避免某课程只显示 1 条题目。
  const selectedAssignmentsMap = new Map();
  selectedAssignmentsRaw.forEach((a) => {
    const k = String(a.title || a.id || Math.random());
    selectedAssignmentsMap.set(k, a);
  });
  seedCourseContent.assignments.forEach((a) => {
    const k = String(a.title || a.id || Math.random());
    if (!selectedAssignmentsMap.has(k)) {
      selectedAssignmentsMap.set(k, a);
    }
  });
  const selectedAssignments = Array.from(selectedAssignmentsMap.values());

  if (state.courseTab === "Announcements") {
    return selectedAnnouncements
      .map(
        (a) => `
        <article class="card course-tab-card compact-item">
          <div class="split">
            <div>
              <div class="announce-header">
                <button class="announce-action ${state.announcementCommentOpen[a.id] ? "announce-action-active" : ""}" onclick="toggleAnnouncementComment('${a.id}')">💬 Comments</button>
                <button class="announce-action ${state.announcementSaved[a.id] ? "announce-action-saved" : ""}" onclick="toggleAnnouncementSave('${a.id}')">${state.announcementSaved[a.id] ? "🔖 Saved" : "🔖 Save"}</button>
                <h4>${a.title}</h4>
              </div>
              <small class="muted announce-meta">
                <span>${data.lecturer.name}</span>
                <span>•</span>
                <span>${a.meta}</span>
              </small>
            </div>
            <div class="lecturer-mini lecturer-chip">${data.lecturer.avatar} ${data.lecturer.name}</div>
          </div>
          <p>${a.text}</p>
          <div class="floating-comment ${state.announcementCommentOpen[a.id] ? "" : "hidden"}">
            <h5>Announcement Discussion</h5>
            <div class="comment-thread">
              <article class="comment-bubble comment-bubble-student">
                <strong>Student</strong>
                <p>Thank you, lecturer.</p>
              </article>
              ${(state.announcementComments[a.id] || [])
                .map(
                  (c) => `
                <article class="comment-bubble comment-bubble-student">
                  <strong>${c.author}</strong>
                  <p>${c.text}</p>
                </article>`
                )
                .join("")}
            </div>
            <div class="comment-compose">
              <input type="text" placeholder="Write your comment..." value="${state.announcementCommentDrafts[a.id] || ""}" oninput="updateAnnouncementCommentDraft('${a.id}', this.value)" />
              <button class="button button-primary" onclick="postAnnouncementComment('${a.id}')">Post</button>
            </div>
          </div>
        </article>
      `
      )
      .join("");
  }

  if (state.courseTab === "Material") {
    function badgeClass(type) {
      if (type === "XLS") return "badge-xls";
      if (type === "W") return "badge-word";
      if (type === "PPT") return "badge-ppt";
      return "badge-pdf";
    }

    return `
      <div class="material-toolbar">
        <div>
          <h4>Class Materials</h4>
          <p class="muted">Open files directly and review course resources by module.</p>
        </div>
      </div>
      ${selectedMaterials.length ? selectedMaterials
        .map(
          (m) => `
            <article class="card course-tab-card">
              <div class="split">
                <div class="file-row">
                  <span class="file-badge ${badgeClass(m.type)}">${m.type}</span>
                  <div>
                    <strong>${m.name}</strong>
                    <p class="muted file-meta">Uploaded by ${data.lecturer.name}</p>
                  </div>
                </div>
                <button class="button button-secondary" onclick="toggleMaterial('${m.id}')">${state.materialOpen[m.id] ? "Hide details" : "View details"}</button>
              </div>
              <div class="${state.materialOpen[m.id] ? "" : "hidden"}">
                <div class="lecturer-comment">
                  <span class="lecturer-avatar">${data.lecturer.avatar}</span>
                  <div>
                    <strong>${data.lecturer.name}</strong>
                    <p class="muted">Please review this file before next class.</p>
                  </div>
                </div>
                <div class="material-file-actions">
                  <a class="button button-primary" href="${m.filePath || "#"}" target="_blank" rel="noopener noreferrer">Open File</a>
                  <a class="button button-secondary" href="${m.filePath || "#"}" download>Download</a>
                </div>
                ${commentsBlock(`${m.id}-material-comments`)}
              </div>
            </article>
          `
        )
        .join("") : `<article class="card course-tab-card"><p class="muted">No lecture notes/materials available.</p></article>`}
    `;
  }

  return assignmentOverviewView(selectedAssignments);
}

function courseView() {
  const tabs = ["Announcements", "Material", "Assignment"];
  const selected = getSelectedCourse();
  const selectedCourseId = getSelectedCourseId();
  const moduleAnnouncementsRaw = selectedCourseId
    ? data.announcements.filter((a) => Number(a.course_id) === Number(selectedCourseId))
    : data.announcements;
  const moduleMaterialsRaw = selectedCourseId
    ? data.materials.filter((m) => Number(m.course_id) === Number(selectedCourseId))
    : data.materials;
  const moduleAssignmentsRaw = selectedCourseId
    ? data.assignments.filter((a) => Number(a.course_id) === Number(selectedCourseId))
    : data.assignments;
  const moduleAnnouncements = moduleAnnouncementsRaw.length
    ? moduleAnnouncementsRaw
    : seedCourseContent.announcements;
  const moduleMaterials = moduleMaterialsRaw.length
    ? moduleMaterialsRaw
    : seedCourseContent.materials;
  const moduleAssignmentsMap = new Map();
  moduleAssignmentsRaw.forEach((a) => {
    const k = String(a.title || a.id || Math.random());
    moduleAssignmentsMap.set(k, a);
  });
  seedCourseContent.assignments.forEach((a) => {
    const k = String(a.title || a.id || Math.random());
    if (!moduleAssignmentsMap.has(k)) {
      moduleAssignmentsMap.set(k, a);
    }
  });
  const moduleAssignments = Array.from(moduleAssignmentsMap.values());
  return `
    <div class="page wide-page fixed-frame">
    ${nav()}
    <section class="course-detail-shell">
      <div class="card course-detail-header">
        <div class="split">
          <div>
            <h2>${state.selectedCourse}</h2>
            <p class="muted">${selected?.category || "General"} · ${selected?.contentType || "Mixed"}</p>
          </div>
          <div class="lecturer-head">
            <span class="lecturer-avatar">${data.lecturer.avatar}</span>
            <div>
              <strong>${data.lecturer.name}</strong>
              <small class="muted">Lecturer</small>
            </div>
          </div>
        </div>
      </div>
      <div class="card course-detail-main">
        <div class="course-detail-tabs">
          ${tabs
            .map(
              (tab) =>
                `<button class="nav-link ${state.courseTab === tab ? "active" : ""}" onclick="setCourseTab('${tab}')">${tab}</button>`
            )
            .join("")}
        </div>
        <div class="course-detail-kpis">
          <div class="kpi-item"><span class="kpi-label">Course Progress</span><strong>${selected?.progress ?? 0}%</strong></div>
          <div class="kpi-item"><span class="kpi-label">Materials</span><strong>${moduleMaterials.length}</strong></div>
          <div class="kpi-item"><span class="kpi-label">Assignments</span><strong>${moduleAssignments.length}</strong></div>
          <div class="kpi-item"><span class="kpi-label">Announcements</span><strong>${moduleAnnouncements.length}</strong></div>
        </div>
        <div class="course-detail-body">
          <aside class="course-detail-aside">
            <h4>My Courses</h4>
            ${data.courses
              .map(
                (course) => `
                <button class="course-pill ${state.selectedCourse === course.name ? "course-pill-active" : ""}" onclick="setCourse('${course.name}')">
                  ${course.name}
                </button>`
              )
              .join("")}
          </aside>
          <main class="course-detail-content">
            ${renderCourseTabContent()}
          </main>
        </div>
      </div>
    </section>
    </div>
  `;
}

function forumView() {
  const tags = ["All", "Web", "Programming", "Database", "Tips"];
  let posts = data.forum.filter(
    (p) =>
      p.title.toLowerCase().includes(state.forumSearch.toLowerCase()) &&
      (state.forumTag === "All" || p.tag === state.forumTag)
  );

  if (state.forumSort === "replies") {
    posts = posts.sort((a, b) => b.replies - a.replies);
  } else if (state.forumSort === "likes") {
    posts = posts.sort((a, b) => b.likes - a.likes);
  }

  return `
    <div class="page wide-page fixed-frame">
    ${nav()}
    <section class="card">
      <div class="split">
        <h2>Forum</h2>
        <button class="button button-primary" onclick="askQuestion()">${state.forumComposerOpen ? "Close Composer" : "Ask Question"}</button>
      </div>
      ${
        state.forumComposerOpen
          ? `<div class="card preview-card">
              <h4>Ask a new question</h4>
              <textarea placeholder="Type your question..." oninput="updateForumDraft(this.value)">${state.forumDraft}</textarea>
              <div class="button-row">
                <button class="button button-primary" onclick="submitForumQuestion()">Post Question</button>
                <button class="button button-secondary" onclick="askQuestion()">Cancel</button>
              </div>
            </div>`
          : ""
      }
      ${
        state.forumReplyTo
          ? `<div class="card preview-card">
              <h4>Reply to: ${state.forumReplyTo}</h4>
              <textarea placeholder="Write your reply..." oninput="updateForumReply(this.value)">${state.forumReplyDraft}</textarea>
              <div class="button-row">
                <button class="button button-primary" onclick="submitForumReply()">Submit Reply</button>
                <button class="button button-secondary" onclick="cancelForumReply()">Cancel</button>
              </div>
            </div>`
          : ""
      }
      <div class="forum-tools">
        <input type="text" placeholder="Search question..." value="${state.forumSearch}" oninput="updateForumSearch(this.value)" />
        <select onchange="updateForumSort(this.value)">
          <option value="latest" ${state.forumSort === "latest" ? "selected" : ""}>Latest</option>
          <option value="replies" ${state.forumSort === "replies" ? "selected" : ""}>Most Replies</option>
          <option value="likes" ${state.forumSort === "likes" ? "selected" : ""}>Most Likes</option>
        </select>
      </div>
      ${
        state.forumViewingPost
          ? (() => {
              const activePost = data.forum.find((p) => p.title === state.forumViewingPost);
              if (!activePost) return "";
              return `<div class="card preview-card forum-preview">
                <div class="split">
                  <strong>Viewing: ${activePost.title}</strong>
                  <button class="button button-secondary" onclick="state.forumViewingPost=null; render();">Close</button>
                </div>
                <p class="muted">By ${activePost.author} · ${activePost.last} · ${activePost.likes} likes · ${activePost.replies} replies</p>
                <p>${activePost.content || "No additional content."}</p>
                ${activePost.image ? `<img src="${activePost.image}" alt="${activePost.title}" class="forum-preview-image" />` : ""}
              </div>`;
            })()
          : ""
      }
      <div class="tag-row">
        ${tags
          .map(
            (t) =>
              `<button class="tag-btn ${state.forumTag === t ? "active-tag" : ""}" onclick="updateForumTag('${t}')">${t}</button>`
          )
          .join("")}
      </div>
      ${posts
        .map(
          (post) => `
            <div class="item forum-post clean-row">
              <div class="forum-main">
                <span class="forum-avatar">${post.avatar || String((post.author || "U")[0] || "U").toUpperCase()}</span>
                <div class="forum-content">
                  <strong>${post.pinned ? "📌 " : ""}${post.title}</strong>
                  <p>${post.content || ""}</p>
                  <p class="muted">${post.author} | ${post.replies} Replies | ${post.likes} Likes | ${post.last}</p>
                </div>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="forum-post-image" />` : ""}
              </div>
              <div class="forum-actions">
                <button class="button button-secondary" onclick="viewPost('${post.title.replace(/'/g, "\\'")}')">View Post</button>
                <button class="button button-secondary" onclick="replyPost('${post.title.replace(/'/g, "\\'")}')">Reply</button>
              </div>
            </div>`
        )
        .join("")}
    </section>
    </div>
  `;
}

function bookstoreView() {
  let filteredBooks = data.books.filter((book) => {
    if (state.bookFilters.country !== "All" && book.country !== state.bookFilters.country) return false;
    if (state.bookFilters.area !== "All" && book.area !== state.bookFilters.area) return false;
    if (state.bookFilters.type !== "All" && book.type !== state.bookFilters.type) return false;
    if (book.price < Number(state.bookFilters.minPrice) || book.price > Number(state.bookFilters.maxPrice)) return false;
    if (state.bookSearch && !book.title.toLowerCase().includes(state.bookSearch.toLowerCase())) return false;
    if (state.bookTag !== "Featured" && book.category !== state.bookTag) return false;
    return true;
  });
  filteredBooks = [...filteredBooks].sort((a, b) => {
    if (state.bookSort === "price-asc") return a.price - b.price;
    if (state.bookSort === "price-desc") return b.price - a.price;
    return a.title.localeCompare(b.title);
  });

  return `
    <div class="page wide-page fixed-frame">
    ${nav()}
    <section class="bookstore-layout bookstore-redesign">
      <aside class="card filter-panel bookstore-filter-panel">
        <div class="split">
          <h3>Filters</h3>
          <button class="button button-secondary" onclick="resetBookFilters()">Reset</button>
        </div>
        <div class="field">
          <label>Country</label>
          <select onchange="setBookFilter('country', this.value)">
            <option>All</option><option>Malaysia</option><option>Singapore</option><option>Indonesia</option><option>Thailand</option>
          </select>
        </div>
        <div class="field">
          <label>Area</label>
          <select onchange="setBookFilter('area', this.value)">
            <option>All</option><option>Klang Valley</option><option>Johor</option><option>Penang</option><option>Central</option><option>Jakarta</option><option>Bangkok</option>
          </select>
        </div>
        <div class="field">
          <label>Types of material</label>
          <select onchange="setBookFilter('type', this.value)">
            <option>All</option><option>Book</option><option>Workbook</option><option>E-Book</option><option>PDF Pack</option>
          </select>
        </div>
        <div class="field">
          <label>Price range: RM ${state.bookFilters.minPrice} - RM ${state.bookFilters.maxPrice}</label>
          <input type="range" min="0" max="200" value="${state.bookFilters.maxPrice}" oninput="setBookFilter('maxPrice', this.value)" />
        </div>
        <div class="bookstore-hint">
          <strong>Tips</strong>
          <p class="muted">Use filters to quickly find books by location, format, and budget.</p>
        </div>
      </aside>
      <div class="card bookstore-main">
        ${
          state.previewBook
            ? `<div class="card preview-card"><div class="split"><strong>Preview: ${state.previewBook}</strong><button class="button button-secondary" onclick="closePreview()">Close</button></div><p class="muted">This is a quick preview area. You can connect this to a real reader view later.</p></div>`
            : ""
        }
        <div class="bookstore-header">
          <div>
            <h2>Bookstore</h2>
            <p class="muted">Browse recommended books, workbooks, and resources.</p>
          </div>
          <div class="bookstore-header-actions">
            <input type="text" placeholder="Search book title..." value="${state.bookSearch}" oninput="setBookSearch(this.value)" />
            <select onchange="setBookSort(this.value)">
              <option value="featured" ${state.bookSort === "featured" ? "selected" : ""}>Sort: Featured</option>
              <option value="price-asc" ${state.bookSort === "price-asc" ? "selected" : ""}>Price: Low to High</option>
              <option value="price-desc" ${state.bookSort === "price-desc" ? "selected" : ""}>Price: High to Low</option>
            </select>
          </div>
        </div>
        <div class="bookstore-tags">
          <button class="tag-btn ${state.bookTag === "Featured" ? "active-tag" : ""}" onclick="setBookTag('Featured')">Featured</button>
          <button class="tag-btn ${state.bookTag === "Programming" ? "active-tag" : ""}" onclick="setBookTag('Programming')">Programming</button>
          <button class="tag-btn ${state.bookTag === "Web Dev" ? "active-tag" : ""}" onclick="setBookTag('Web Dev')">Web Dev</button>
          <button class="tag-btn ${state.bookTag === "Database" ? "active-tag" : ""}" onclick="setBookTag('Database')">Database</button>
        </div>
        <div class="bookstore-count muted">${filteredBooks.length} resource(s) found</div>
        <div class="bookstore-grid">
        ${filteredBooks
          .map(
            (book) => `
              <article class="card bookstore-card">
                <img src="${book.image}" alt="${book.title}" class="book-image" />
                <div class="book-card-body">
                  <div class="split">
                    <span class="category-label">${book.category}</span>
                    <span class="book-price">RM ${book.price.toFixed(2)}</span>
                  </div>
                  <h4>${book.title}</h4>
                  <p class="muted">${book.type} · ${book.country}, ${book.area}</p>
                  <div class="split">
                    <button class="button button-secondary" onclick="previewBook('${book.title.replace(/'/g, "\\'")}')">Preview</button>
                    <button class="button button-primary" onclick="addToCart('${book.title.replace(/'/g, "\\'")}')">Add to Cart</button>
                  </div>
                </div>
              </article>`
          )
          .join("")}
        </div>
      </div>
      <aside class="card cart-panel">
        <div class="split">
          <h3>Shopping Cart</h3>
          <button class="button button-secondary" onclick="clearCart()">Clear</button>
        </div>
        ${
          Object.keys(state.cart).length === 0
            ? `<p class="muted">Your cart is empty.</p>`
            : Object.entries(state.cart)
                .map(([title, qty]) => {
                  const book = data.books.find((b) => b.title === title);
                  const price = book ? book.price : 0;
                  return `<div class="item"><strong>${title}</strong><p class="muted">RM ${price.toFixed(2)} x ${qty}</p><div class="button-row"><button class="button button-secondary" onclick="changeCartQty('${title.replace(/'/g, "\\'")}', -1)">-</button><button class="button button-secondary" onclick="changeCartQty('${title.replace(/'/g, "\\'")}', 1)">+</button><button class="button button-secondary" onclick="removeFromCart('${title.replace(/'/g, "\\'")}')">Remove</button></div></div>`;
                })
                .join("")
        }
        <div class="cart-total">
          <strong>Total: RM ${Object.entries(state.cart)
            .reduce((sum, [title, qty]) => {
              const book = data.books.find((b) => b.title === title);
              return sum + (book ? book.price * qty : 0);
            }, 0)
            .toFixed(2)}</strong>
        </div>
        <button class="button button-primary" onclick="checkoutCart()">Checkout</button>
      </aside>
    </section>
    </div>
  `;
}

function profileView() {
  return `
    <div class="page wide-page fixed-frame">
      ${nav()}
      <section class="profile-layout">
        <div class="card">
          <h2>Account Profile</h2>
          <p class="muted">Update your personal information and account preferences.</p>
          <div class="field">
            <label>Full Name</label>
            <input type="text" value="${state.profileDraft.name}" oninput="updateProfileField('name', this.value)" />
          </div>
          <div class="field">
            <label>Email</label>
            <input type="email" value="${state.profileDraft.email}" oninput="updateProfileField('email', this.value)" />
          </div>
          <div class="field">
            <label>Bio</label>
            <textarea placeholder="Tell us about yourself" oninput="updateProfileField('bio', this.value)">${state.profileDraft.bio}</textarea>
          </div>
          <button class="button button-primary" onclick="saveProfile()">Save Changes</button>
        </div>
        <div class="card">
          <h3>Account Settings</h3>
          <div class="field">
            <label>Language</label>
            <select onchange="updateSettingsField('language', this.value)">
              <option ${state.settingsDraft.language === "English" ? "selected" : ""}>English</option>
              <option ${state.settingsDraft.language === "Bahasa Malaysia" ? "selected" : ""}>Bahasa Malaysia</option>
            </select>
          </div>
          <div class="field">
            <label>Theme</label>
            <select onchange="updateSettingsField('theme', this.value)">
              <option ${state.settingsDraft.theme === "Light" ? "selected" : ""}>Light</option>
              <option ${state.settingsDraft.theme === "System Default" ? "selected" : ""}>System Default</option>
            </select>
          </div>
          <div class="field">
            <label>Notification preference</label>
            <select onchange="updateSettingsField('notificationPref', this.value)">
              <option ${state.settingsDraft.notificationPref === "All notifications" ? "selected" : ""}>All notifications</option>
              <option ${state.settingsDraft.notificationPref === "Important only" ? "selected" : ""}>Important only</option>
            </select>
          </div>
          <button class="button button-secondary" onclick="updateSettings()">Update Settings</button>
        </div>
      </section>
    </div>
  `;
}

function paymentView() {
  const total = Object.entries(state.cart).reduce((sum, [title, qty]) => {
    const book = data.books.find((b) => b.title === title);
    return sum + (book ? book.price * qty : 0);
  }, 0);

  return `
    <div class="page wide-page fixed-frame">
      ${nav()}
      <section class="card payment-layout">
        <div class="payment-summary">
          <h2>Payment</h2>
          <p class="muted">Complete payment securely to finish checkout.</p>
          <div class="payment-note-row">
            <span class="category-label">Secure Checkout</span>
            <span class="muted">TLS encrypted</span>
          </div>
          <div class="item payment-order-card">
            <strong>Order Summary</strong>
            ${
              Object.keys(state.cart).length
                ? Object.entries(state.cart)
                    .map(([title, qty]) => `<div class="progress-row"><span>${title}</span><span>x${qty}</span></div>`)
                    .join("")
                : `<p class="muted">No items in cart. Add books before payment.</p>`
            }
            <div class="cart-total"><strong>Total: RM ${total.toFixed(2)}</strong></div>
          </div>
          <div class="payment-help card">
            <h4>Need Help?</h4>
            <p class="muted">Use sample card number 4242 4242 4242 4242 with any valid expiry/CVC for demo payments.</p>
          </div>
        </div>
        <form class="card payment-form-card" onsubmit="processPayment(event)">
          <h3>Card Details</h3>
          <div class="payment-methods">
            <span class="payment-chip">Visa</span>
            <span class="payment-chip">Mastercard</span>
            <span class="payment-chip">FPX</span>
          </div>
          <div class="field"><label>Full Name</label><input value="${state.paymentDraft.fullName}" oninput="updatePaymentField('fullName', this.value)" /></div>
          <div class="field"><label>Email</label><input value="${state.paymentDraft.email}" oninput="updatePaymentField('email', this.value)" /></div>
          <div class="field"><label>Card Number</label><input value="${state.paymentDraft.cardNumber}" oninput="updatePaymentField('cardNumber', this.value)" placeholder="4242 4242 4242 4242" /></div>
          <div class="split">
            <div class="field"><label>Expiry</label><input value="${state.paymentDraft.expiry}" oninput="updatePaymentField('expiry', this.value)" placeholder="MM/YY" /></div>
            <div class="field"><label>CVC</label><input value="${state.paymentDraft.cvc}" oninput="updatePaymentField('cvc', this.value)" placeholder="123" /></div>
          </div>
          <div class="button-row">
            <button class="button button-secondary" type="button" onclick="setPostLoginPage('bookstore')">Back</button>
            <button class="button button-primary" type="submit">Pay Now</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function toastLayer() {
  return `
    <div class="toast-wrap">
      ${state.toasts
        .map((t) => `<div class="toast toast-${t.type}"><span>${t.message}</span><button class="toast-close" onclick="dismissToast('${t.id}')">×</button></div>`)
        .join("")}
    </div>
  `;
}

function appView() {
  if (!state.isLoggedIn && state.page === "landing") {
    return landingView();
  }
  if (!state.isLoggedIn && state.page === "auth") {
    return authView();
  }

  const pages = {
    home: homeView,
    courses: coursesView,
    courseDetail: courseView,
    forum: forumView,
    bookstore: bookstoreView,
    profile: profileView,
    payment: paymentView,
  };

  return `${pages[state.postLoginPage]()}${toastLayer()}`;
}

function render() {
  document.getElementById("app").innerHTML = appView();
  bindAuthForm();
}

render();
