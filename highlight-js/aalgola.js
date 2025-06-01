
function hljsDefineAalgola(hljs) {
	return {
		name: 'Aalgola',
		unicodeRegex: true,
		contains: [
			{ // Annotation: ⟦application(name: "aac")⟧
				className: 'annotation',
				begin: /⟦\s*(([a-z]+)|([a-z]+[(-][^⟧]+))⟧/um
			},
			{ // Wort-Folge: ⦍01 23 45 67 89 AB CD EF⦎₁₆
				className: 'memory',
				begin: /[⦋⦏⦍][^⦌⦎⦐]+[⦌⦎⦐][₀₁₂₃₄₅₆₇₈₉]+/um
			},
			{ // Ignorierbarer Teil (mit U+200C als Marker, hier mit ¤ dargestellt): ⁌¤[[[ … ]]]¤⁍
				className: 'ignore',
				begin: '[⁌][\u200C][\[]',
				end: '[\u200C][⁍]'
			},
			{ // Zeilenkommentar.
				className: 'comment',
				begin: '¶',
				end: '$'
			},
			{ // Dokumentationskommentar: ⁌ … ⁍
				className: 'doc-comment',
				begin: '⁌',
				end: '⁍'
			},
			{ // Zeichenketten.
				className: 'string',
				variants: [
					{ begin: '“',	end: '”' },
					{ begin: '‘',		end: '’' },
					{ begin: '«',	end: '»' },
					{ begin: '"""',	end: '"""',	contains: [hljs.BACKSLASH_ESCAPE] },
					{ begin: '"',	end: '"',	contains: [hljs.BACKSLASH_ESCAPE] },
					{ begin: "'",	end: "'",	contains: [hljs.BACKSLASH_ESCAPE] }
				]
			},
			{ // URI: //aalgola.org/core/intrinsic/Object, ./abc/def.txt, ../..//root
				className: 'literal',
				begin: /(?:(?:\.\.?[/])|(?:[/]{2,3}))(?:(?:[\p{L}\p{N}_\.]*)|(?:\.\.))(?:[/](?:(?:[\p{L}\p{N}_\.]*)|(?:\.\.)))*[/]?/u
			},
			{ // Einheiten: π
				className: 'units',
				begin: /[\u{10A000}\u{10A001}\u{10A002}\u{10A003}\u{10A004}\u{10A005}\u{10A006}\u{10A007}\u{10A008}\u{10A009}\u{10A00A}\u{10A00B}\u{10A00C}\u{10A00D}\u{10A00E}\u{10A00F}\u{10A010}\u{10A011}\u{10A012}\u{10A013}\u{10A014}\u{10A015}\u{10A016}\u{10A017}\u{10A018}\u{10A019}\u{10A01A}\u{10A01B}\u{10A01C}\u{10A01D}\u{10A01E}\u{10A01F}\u{10A020}\u{10A021}\u{10A022}\u{10A023}\u{10A024}\u{10A025}\u{10A026}\u{10A027}\u{10A028}\u{10A029}\u{10A02A}\u{10A02B}\u{10A02C}\u{10A02D}\u{10A02E}\u{10A02F}\u{10A030}\u{10A031}\u{10A032}\u{10A033}]/u
				// begin: /[\u{10A000}\u{10A000}\u{10A024}]/u
				// begin: /[\uDBE8][\uDC26]/u
				// begin: /([\u212A]|([\uDBE8][\uDC00-\uDC33]))+/u
			},
			{ // b-adische Zahl: (123ABC)₁₆
				className: 'number',
				begin: /[(][0-9A-Z\s]+[)][₀₁₂₃₄₅₆₇₈₉]+/u
			},
			{ // Geo-Koordinate: 12° 34′ 56.78″ N 012° 34′ 56.78″ W
				className: 'literal',
				begin: /\d{2}°\s?\d+′\s?\d+\.\d+″\s[NS]\s\d{3}°\s?\d+′\s?\d+\.\d+″\s[WE]/
			},
			{ // Gradzahl: 12° 34′ 56.78″
				className: 'literal',
				begin: /[+−]?(?:\d+(?:\.\d+)?°)(?:\s?\d+(?:\.\d+)?′(?:\s?\d+(?:\.\d+)?″)?)?/
			},
			{ // Datum mit (optionaler) Uhrzeit: 2025-001, 2025-05-01T12:34:56.789
				className: 'literal',
				begin: /\d{4}[-]\d{2}(?:\d|(?:[-]\d{2}))(?:T\d{2}[:]\d{2}(?:[:]\d{2}(\.[\d\u202F]+)?)?)?/u
			},
			{ // Jahreswoche mit Tag und (optionaler) Uhrzeit: 2025-W04, 2025-W12-6
				className: 'literal',
				begin: /\d{4}[-]W\d{2}(?:[-]\d(?:T\d{2}[:]\d{2}(?:[:]\d{2}(\.[\d\u202F]+)?)?)?)?/
			},
			{  // Uhrzeit: 12:34:56.789
				className: 'literal',
				begin: /\d{2}[:]\d{2}(?:[:]\d{2}(?:\.[\d\u202F]+)?)?/
			},
			{ // IP4-Adresse: 192.0.0.1
				className: 'literal',
				begin: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
			},
			{ // Version: 1.2.3-alpha+20240502T1234
				className: 'literal',
				begin: /\d+\.\d+\.\d+(?:[-][0-9A-Za-z]+)?(?:[+][0-9A-Za-z]+)?/
			},
			{ // Sprungmarke (Nutzung): goto label
				className: 'label',
				begin: /((?<=(break|continue|goto))\s+)[\p{L}\p{Nd}_]+[↓↑]?/u
			},
			{ // Sprungmarke (Definition): label:
				className: 'label',
				begin: /^\s*[\p{L}\p{Nd}_]+[:]/um
			},
			{ // Symbolmarke (Nutzung): goto ①
				className: 'label-symbol',
				begin: /((?<=(:break|continue|goto))\s+)[\p{L}\p{N}_]+[↓↑]?/u
			},
			{ // Symbolmarke (Definition): ①:
				className: 'label-symbol',
				begin: /^\s*[\p{L}\p{N}_]+[:]/um
			},
			{ // Konstante: ENUM, MAX_VALUE, 3D, 3_D
				className: 'const',
				begin: /(?<![\p{L}\p{Nd}⟦])(?:(?:\p{Nd}\p{Lu})|(?:(?:(?:\p{Nd}[_\p{Lu}])|(?:\p{Lu}\p{Lu}))[_\p{Lu}\p{Nd}]+))(?![(\p{L}\p{Nd}⟧])/u
			},
			{ // Parametermarke: (x: 12, y: 10)
				className: 'named',
				begin: /[\p{Ll}\p{Nd}_]+[:]/u
			},
			{ // Schlüsselwort: if
				className: 'keyword',
				begin: /(?<![\p{L}\p{Nd}\u200C_-])(after|as|asif|assert|assume|assumes|atom|basedon|before|break|case|catch|coercion|comprises|const|continue|dimension|defer|do|doing|else|elseif|end|endm|ensures|enum|extends|finally|for|function|goto|if|import|inbetween|init|interface|invariant|is|isa|law|library|license|loop|macro|method|module|namespace|object|of|otherwise|package|parallel|pass|phrase|prefix|procedure|provided|requires|return|spawn|step|switch|synchronized|terminate|test|then|throw|throws|times|try|type|unit|unless|until|variant|with|where|while|yield)(?![\p{L}\p{Nd}_-])/
			},
			{ // Schlüsselwort: base
				className: 'keyvalue',
				begin: /(?<![\p{L}\p{Nd}\u200C_-])(?:base|result|self|super)(?![\p{L}\p{Nd}])/u
			},
			{ // Routine: f, fun
				className: 'routine',
				begin: /(?<![\p{L}\p{Nd}⟦])(?:(?:\p{Lu})|(?:(?:(?:\p{Nd}\p{Ll})|(\p{Ll}))[\p{Ll}\p{Nd}]*))(?=[\(⟦⟧])/u
			},
			{ // Variable: x, N, max_value
				className: 'variable',
				begin: /(?<![\p{L}\p{Nd}⟦])(?:(?:\p{Lu})|(?:(?:(?:\p{Nd}\p{Ll})|(\p{Ll}))([_]?[\p{Ll}\p{Nd}])*))(?![\(\p{L}\p{Nd}⟧])/u
			},
			{ // Brüche
				className: 'number',
				begin: /(?:(?:[+−]?\d*|[⁺⁻])?[½⅓⅔¼¾⅕⅖⅗⅘⅙⅚⅛⅜⅝⅞])|(?:(?:[+−]?\d*|[⁺⁻])?[⁰¹²³⁴⁵⁶⁷⁸⁹]+\u2044[₊₋]?[₀₁₂₃₄₅₆₇₈₉]+)/u
			},
			{ // Gleitkommazahlen: 1.23, 1.23…, 12.34̣, 12.34̣…, 12.3𝟒, 0.123̅, 1.23(45) × 10¹²
				className: 'number',
				variants: [
					{ begin: /[+−]?\d+(?:[\u202F]?\d)*\.(?:\d+[\u202F]?)*(?:…|[\u0307\u0323]…?|[𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗]|\u0305(?:\d\u0305)+|[\u202F]?\(\d+\))?(?:\s*×\s*\d+[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/u },
					{ begin: /[+−]?\d+(?:[\u202F]?\d)*[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+(?![\u2044])/u }
				]
			},
			{
				className: 'number',
				begin: /[+−]?\d+(?:[\u202F]?\d)*[𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗]?(?:\s*×\s*\d+[⁺⁻]?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?/u
			},
			{
				className: 'variable',
				begin: /\b\p{Ll}[\p{Ll}\p{Nd}_]*\b/u
			}
//			,
//			{ // Hochgestellte Zeichen (mit und ohne Vorschub).
//				className: 'symbol',
//				begin: /[⁺⁻⁰¹²³⁴⁵⁶⁷⁸⁹\u{10A290}-\u{10A3BF}]+/u
//			}
		]
	};
}

if (typeof window !== 'undefined' && window.hljs) {
	window.hljs.registerLanguage('aalgola', hljsDefineAalgola);
}
window.hljsDefineAalgola = hljsDefineAalgola;
