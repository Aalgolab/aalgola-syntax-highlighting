
<h1>
  <img src="./aalgola_logo.svg" alt="Aalgola"/><br>
  Syntax Highlighting
</h1>

Syntax highlighters like [Prism.js](https://prismjs.com/) or [Highlight.js](https://highlightjs.org/) are 
useful tools that visually enhance code by applying color to different syntax elements. These tools analyze 
the code and use regular expressions to identify individual syntax components, such as keywords, variables, 
comments, and literals, and assign specific colors or styles to them. This makes it easier to read and 
understand the code, as the reader can quickly identify the different parts of the code and their roles.

These tools typically work by embedding the code as text in HTML or another format, where regular expressions 
are used to find patterns that typically represent certain syntax elements in a programming language. Style 
rules (often via CSS) are then applied to visually highlight these matches.

### Limitations of Regular Expressions

Although these regular expressions are effective for visual representation, there is an important limitation: 
they are not designed to check the correctness or semantics of the code. They are simply used to match
patterns and display them in the desired manner. For example, the regular expression may identify a date
in the format `YYYY-MM-DD` and highlight it accordingly. However, it doesn't verify whether the found date
is actually valid.

For example, the regular expression might highlight `2025-02-33` as a valid date, even though it is clearly
invalid (there is no 33rd of February). The syntax highlighter would still display this as a date, without
recognizing that it is an error.

This limitation illustrates that syntax highlighting tools, while useful for visually representing Aalgola 
code, are not capable of determining whether the code is syntactically and semantically correct. They do not 
provide deeper analysis to check whether the code conforms to valid Aalgola syntax—such as whether variables 
are properly declared or dates are realistic. For such checks, more advanced tools like parsers or interpreters 
would be necessary to validate the correctness of the code.

