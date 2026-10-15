
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

const DRAFT_KEY = "day4-note-draft";
const THEME_KEY = "day4-note-theme";

// Update the character and word counters
function updateCounts() {
  const text = noteText.value;
  const characters = text.length;
  const trimmedText = text.trim();

  const words = trimmedText === ""
    ? 0
    : trimmedText.split(/\s+/).length;

  charCount.textContent = `${characters} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.remove("warning", "over");

  if (characters > 200) {
    charCount.classList.add("over");
  } else if (characters > 180) {
    charCount.classList.add("warning");
  }
}

// Save the current draft
function saveDraft() {
  localStorage.setItem(DRAFT_KEY, noteText.value);
}

// Clear the note and remove the saved draft
function clearNote() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

// Apply and remember the selected theme
function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);

  themeToggle.textContent = isDark
    ? "Light mode"
    : "Dark mode";

  localStorage.setItem(THEME_KEY, isDark ? "dark" : "light");
}

// Update counters and save whenever the user types
noteText.addEventListener("input", function () {
  updateCounts();
  saveDraft();
});

// Clear button
clearBtn.addEventListener("click", clearNote);

// Escape key clears the note
noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

// Toggle between light and dark themes
themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
});

// Restore the saved draft and theme when the page loads
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
  noteText.value = savedDraft;
}

const savedTheme = localStorage.getItem(THEME_KEY);
setTheme(savedTheme === "dark");

updateCounts();
