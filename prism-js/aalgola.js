
Prism.languages.aalgola = {
	'annotation': { // Annotation: ⟦application(name: "aac")⟧
		pattern: /⟦\s*(([a-z]+)|([a-z]+[(-][^⟧]+))⟧/um
	},
	'memory-literal': { // Wort-Folge: ⦍01 23 45 67 89 AB CD EF⦎₁₆
		pattern: /[⦋⦏⦍][^⦌⦎⦐]+[⦌⦎⦐][₀₁₂₃₄₅₆₇₈₉]+/um,
		alias: ["memory", "literal"]
	},
	'ignore': { // Ignorierbarer Teil (mit U+200C als Marker, hier mit ¤ dargestellt): ⁌¤[[[ … ]]]¤⁍
		pattern: /⁌\u200C\[[^\u200C]*\u200C⁍/mu
	},
	'comment': { // Zeilenkommentar.
		pattern: /¶.*/
	},
	'doc-comment': { // Dokumentationskommentar: ⁌ … ⁍
		pattern: /⁌[^[][^⁍]*⁍/m
	},
	'string': [ // Zeichenketten.
		/“[^”]*”/,
		/‘[^’]*’/,
		/«[^»]*»/m
	],
	'j-string': { // Mehrzeilige Zeichenkette: """ … """
		pattern: /"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,
		greedy: true,
		alias: "string"
	},
	'c-string': { // Zeichenkette: " … "
		pattern: /"(?:\\.|[^"\\])*"/,
		greedy: true,
		alias: "string"
	},
	'c-char': { // Zeichen: ' … '
		pattern: /'(?:\\.|[^'\\])*'/,
		greedy: true,
		alias: "string"
	},
	'uri': { // URI: //aalgola.org/core/intrinsic/Object, ./abc/def.txt, ../..//root
		pattern: /(?:(?:\.\.?[/])|(?:[/]{2,3}))(?:(?:[\p{L}\p{N}_\.]*)|(?:\.\.))(?:[/](?:(?:[\p{L}\p{N}_\.]*)|(?:\.\.)))*[/]?/u,
		alias: "literal"
	},
	'units': { // Einheiten: π
		pattern: /[\u212A\u{10A000}-\u{10A033}]+/u
	},
	'b-adic-number': { // b-adische Zahl: (123ABC)₁₆
		pattern: /[(][0-9A-Z\s]+[)][₀₁₂₃₄₅₆₇₈₉]+/u,
		alias: "number"
	},
	'geo-coordinate': { // Geo-Koordinate: 12° 34′ 56.78″ N 012° 34′ 56.78″ W
		pattern: /\d{2}°\s?\d+′\s?\d+\.\d+″\s[NS]\s\d{3}°\s?\d+′\s?\d+\.\d+″\s[WE]/,
		alias: "literal"
	},
	'degree-literal': { // Gradzahl: 12° 34′ 56.78″
		pattern: /[+−]?(?:\d+(?:\.\d+)?°)(?:\s?\d+(?:\.\d+)?′(?:\s?\d+(?:\.\d+)?″)?)?/,
		alias: "literal"
	},
	'date-time-literal': { // Datum mit (optionaler) Uhrzeit: 2025-001, 2025-05-01T12:34:56.789
		pattern: /\d{4}[-]\d{2}(?:\d|(?:[-]\d{2}))(?:T\d{2}[:]\d{2}(?:[:]\d{2}(\.[\d\u202F]+)?)?)?/u,
		alias: "literal"
	},
	'week-date': { // Jahreswoche mit Tag und (optionaler) Uhrzeit: 2025-W04, 2025-W12-6
		pattern: /\d{4}[-]W\d{2}(?:[-]\d(?:T\d{2}[:]\d{2}(?:[:]\d{2}(\.[\d\u202F]+)?)?)?)?/,
		alias: "literal"
	},
	'time-literal': { // Uhrzeit: 12:34:56.789
		pattern: /\d{2}[:]\d{2}(?:[:]\d{2}(?:\.[\d\u202F]+)?)?/,
		alias: "literal"
	},
	'ip4-address': { // IP4-Adresse: 192.0.0.1
		pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/,
		alias: "literal"
	},
	'version-literal': { // Version: 1.2.3-alpha+20240502T1234
		pattern: /\d+\.\d+\.\d+(?:[-][0-9A-Za-z]+)?(?:[+][0-9A-Za-z]+)?/,
		alias: "literal"
	}, // als vierte Komponente (\.\d+)?
	'label-reference': { // Sprungmarke (Nutzung): goto label
		pattern: /((?:break|continue|goto)\s+)[\p{L}\p{Nd}_]+[↓↑]?/u,
		lookbehind: true,
		alias: "label"
	},
	'label': { // Sprungmarke (Definition): label:
		pattern: /^\s*[\p{L}\p{Nd}_]+[:]/um
	},
	'label-symbol': { // Symbolmarke (Nutzung): goto ①
		pattern: /((?:break|continue|goto)\s+)[\p{L}\p{N}_]+[↓↑]?/u,
		lookbehind: true
	},
	'other-label': { // Symbolmarke (Definition): ①:
		pattern: /^\s*[\p{L}\p{N}_]+[:]/um,
		alias: "label-symbol"
	},
	'type': { // Typname: Type, ℕ
		pattern: /([^\p{L}\p{Nd}⟦])[𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ]|(?:\p{Lu}[\p{L}\p{Nd}]*\p{Ll}[\p{L}\p{Nd}]+)(?![(\p{L}\p{Nd}⟧])/u,
		lookbehind: true
	},
	'const': { // Konstante: ENUM, MAX_VALUE, 3D, 3_D
		pattern: /([^\p{L}\p{Nd}⟦])(?:(?:\p{Nd}\p{Lu})|(?:(?:(?:\p{Nd}[_\p{Lu}])|(?:\p{Lu}\p{Lu}))[_\p{Lu}\p{Nd}]+))(?![(\p{L}\p{Nd}⟧])/u,
		lookbehind: true
	},
	'named': { // Parametermarke: (x: 12, y: 10)
		pattern: /[\p{Ll}\p{Nd}_]+[:]/u
	},
	'keyword': { // Schlüsselwort: if
		pattern: /(^|[^\p{L}\p{Nd}\u200C_-])(?:after|as|asif|assert|assume|assumes|atom|basedon|before|break|case|catch|coercion|comprises|const|continue|dimension|defer|do|doing|else|elseif|end|endm|ensures|enum|extends|finally|for|function|goto|if|import|inbetween|init|interface|invariant|is|isa|law|library|license|loop|macro|method|module|namespace|object|of|otherwise|package|parallel|pass|phrase|prefix|procedure|provided|requires|return|spawn|step|switch|synchronized|terminate|test|then|throw|throws|times|try|type|unit|unless|until|variant|with|where|while|yield)(?![\p{L}\p{Nd}_-])/u,
		lookbehind: true
	},
	'keyvalue': { // Schlüsselwert: base
		pattern: /([^\p{L}\p{Nd}\u200C_-])(?:base|result|self|super)(?![\p{L}\p{Nd}])/u,
		lookbehind: true
	},
	'variable': { // Variable: x, N, max_value
		pattern: /([^\p{L}\p{Nd}⟦])(?:(?:\p{Lu})|(?:(?:(?:\p{Nd}\p{Ll})|(\p{Ll}))([_\p{Ll}\p{Nd}])*))(?![\(\p{L}\p{Nd}⟧])/u,
		lookbehind: true
	},
	'fraction': { // Brüche
		pattern: /(?:(?:[+−]?\d*|[⁺⁻])?[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])|(?:(?:[+−]?\d*|[⁺⁻])?[⁰¹²³⁴⁵⁶⁷⁸⁹]+\u2044[₊₋]?[₀₁₂₃₄₅₆₇₈₉]+)/u,
		alias: "number"
	},
	'number': [ // Gleitkommazahlen: 1.23, 1.23…, 12.34̣, 12.34̣…, 12.3𝟒, 0.123̅, 1.23(45) × 10¹²
		/[+−]?\d(?:[\u202F]?\d)*\.\d(?:[\u202F]?\d)*(?:[…]|[\u0307\u0323][…]?|[𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗]|(?:\u0305(?:\d\u0305)+)|(?:[\u202F]?\(\d+\)))?(?:\s*×\s*\d+[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/u,
		/[+−]?\d(?:[\u202F]?\d)*[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+/u
	],
	'other-number': { // Ganzzahlen mit Faktor:  123, 123𝟒 × 10¹²
		pattern: /[+−]?\d(?:[\u202F]?\d)*[𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗]?(?:\s*×\s*\d+[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/u,
		greedy: true,
		alias: "number"
	},
	'superscript': { // Hochgestellte Zeichen (mit und ohne Vorschub).
		pattern: /[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹\u{10A290}-\u{10A3BF}]+/u
	}
};

