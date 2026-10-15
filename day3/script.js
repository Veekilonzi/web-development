
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. Search notes
function searchNotes(word) {
  return notes.filter(note =>
    note.text.toLowerCase().includes(word.toLowerCase())
  );
}

console.log("Search:", searchNotes("JAVASCRIPT"));
// Expected: the note "Revise JavaScript arrays"

console.log("Search with no results:", searchNotes("pizza"));
// Expected: []


// 2. Find the longest note
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  return notes.reduce((longest, note) =>
    note.text.length > longest.text.length ? note : longest
  );
}

console.log("Longest note:", longestNote());
// Expected: the note "Email the project report to Grace"

const savedNotes = notes;
notes = [];
console.log("Longest note when empty:", longestNote());
// Expected: null
notes = savedNotes;


// 3. Count notes by category
function countByCategory() {
  const counts = { personal: 0, work: 0, study: 0 };

  for (const note of notes) {
    counts[note.category]++;
  }

  return counts;
}

console.log("Category counts:", countByCategory());
// Expected: { personal: 2, work: 1, study: 2 }

const originalNotes = notes;
notes = [];
console.log("Empty category counts:", countByCategory());
// Expected: { personal: 0, work: 0, study: 0 }
notes = originalNotes;


// 4. Summarize the notes
function getSummary() {
  const counts = countByCategory();
  const total = notes.length;
  const word = total === 1 ? "note" : "notes";

  return `${total} ${word}: ${counts.personal} personal, ${counts.work} work, ${counts.study} study.`;
}

console.log("Summary:", getSummary());
// Expected: "5 notes: 2 personal, 1 work, 2 study."

const notesBeforeSummaryTest = notes;
notes = [{ id: 1, text: "Read a book", category: "personal" }];
console.log("Single-note summary:", getSummary());
// Expected: "1 note: 1 personal, 0 work, 0 study."
notes = notesBeforeSummaryTest;


// 5. Check duplicate notes
function isDuplicate(text) {
  const normalizedText = text.trim().toLowerCase();

  return notes.some(note =>
    note.text.trim().toLowerCase() === normalizedText
  );
}

console.log("Duplicate check:", isDuplicate("  BUY MILK AND BREAD  "));
// Expected: true

console.log("New note check:", isDuplicate("Walk the dog"));
// Expected: false


// 6. Add a new note
function addNote(text, category) {
  if (typeof text !== "string" || text.trim().length === 0) {
    console.log("Rejected: note cannot be empty.");
    return false;
  }

  const cleanedText = text.trim();

  if (cleanedText.length > 200) {
    console.log("Rejected: note exceeds 200 characters.");
    return false;
  }

  if (!["personal", "work", "study"].includes(category)) {
    console.log("Rejected: invalid category.");
    return false;
  }

  if (isDuplicate(cleanedText)) {
    console.log("Rejected: duplicate note.");
    return false;
  }

  const nextId = Math.max(0, ...notes.map(note => note.id)) + 1;

  notes.push({
    id: nextId,
    text: cleanedText,
    category: category
  });

  console.log("Note added successfully.");
  return true;
}

console.log("Add valid note:", addNote("Walk the dog", "personal"));
// Expected: logs success, then true

console.log("Add duplicate:", addNote(" WALK THE DOG ", "personal"));
// Expected: logs duplicate rejection, then false

console.log("Invalid category:", addNote("Prepare presentation", "other"));
// Expected: logs invalid category, then false
