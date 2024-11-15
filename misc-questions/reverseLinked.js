// WHOLE CODE
class ListNode {
  constructor(val) {
    this.val = val; // Value of the node
    this.next = null; // Pointer to the next node, initially null
  }
}

// Create nodes
let node1 = new ListNode(1);
let node2 = new ListNode(2);
let node3 = new ListNode(3);

// Connect nodes to form a linked list
node1.next = node2;
console.log("node1.next type is ", typeof node1.next)
node2.next = node3;
console.log("node2.next is ", node2.next)

// The head of the linked list is node1
let head = node1;

var reverseList = function(head) {
  let prev = null;
  let curr = head;
  
  while (curr !== null) {
      let next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
  }
  
  return prev;
};


// Reverse the linked list
let reversedListHead = reverseList(head);

// Function to print the reversed linked list
function printList(head) {
  let current = head;
  while (current !== null) {
      console.log(current.val);
      current = current.next;
  }
}

// Print the reversed linked list
console.log("Reversed Linked List:");
printList(reversedListHead);