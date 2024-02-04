class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export class BST {
  private root: TreeNode | null = null;

  insert(value: number): void {
    let newNode = new TreeNode(value);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  traverse(
    type: "inorder" | "preorder" | "postorder" = "inorder"
  ): number[] | string {
    const node = this.root;
    const result: number[] = [];

    if (node === null) return "No tree found";
    else {
      this.inOrderHelper(node, result, type);
      return result;
    }
  }

  private inOrderHelper(
    node: TreeNode | null,
    result: number[],
    type: string
  ): void {
    if (type === "inorder") {
      if (node !== null) {
        this.inOrderHelper(node.left, result, type);
        result.push(node.value);
        this.inOrderHelper(node.right, result, type);
      }
    } else if (type === "preorder") {
      if (node !== null) {
        result.push(node.value);
        this.inOrderHelper(node.left, result, type);
        this.inOrderHelper(node.right, result, type);
      }
    } else if (type === "postorder") {
      if (node !== null) {
        this.inOrderHelper(node.left, result, type);
        this.inOrderHelper(node.right, result, type);
        result.push(node.value);
      }
    }
  }

  search(
    value: number,
    returnNode: boolean = false
  ): boolean | string | TreeNode {
    let node = this.root as TreeNode;

    if (node === null) return "No tree found";
    else return this.searchHelper(node, value, returnNode);
  }

  private searchHelper(
    node: TreeNode,
    value: number,
    returnNode: boolean
  ): boolean | TreeNode {
    if (node === null) return false;
    else if (value < node.value)
      return this.searchHelper(node.left as TreeNode, value, returnNode);
    else if (value > node.value)
      return this.searchHelper(node.right as TreeNode, value, returnNode);
    else return returnNode ? node : true;
  }
}

const bstNode = new BST();
[2, 5, 1, 7, 9, 0, 2, 4, 5].map((value) => {
  bstNode.insert(value);
});

console.log(bstNode.search(1, true));
