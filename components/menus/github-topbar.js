// Primer Octicons (MIT), path data copied from @primer/octicons build/svg/*-16.svg.
const P = {
  'three-bars': '<path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"/>',
  'mark-github': '<path d="M6.766 11.328c-2.063-.25-3.516-1.734-3.516-3.656 0-.781.281-1.625.75-2.188-.203-.515-.172-1.609.063-2.062.625-.078 1.468.25 1.968.703.594-.187 1.219-.281 1.985-.281.765 0 1.39.094 1.953.265.484-.437 1.344-.765 1.969-.687.218.422.25 1.515.046 2.047.5.593.766 1.39.766 2.203 0 1.922-1.453 3.375-3.547 3.64.531.344.89 1.094.89 1.954v1.625c0 .468.391.734.86.547C13.781 14.359 16 11.53 16 8.03 16 3.61 12.406 0 7.984 0 3.563 0 0 3.61 0 8.031a7.88 7.88 0 0 0 5.172 7.422c.422.156.828-.125.828-.547v-1.25c-.219.094-.5.156-.75.156-1.031 0-1.64-.562-2.078-1.609-.172-.422-.36-.672-.719-.719-.187-.015-.25-.093-.25-.187 0-.188.313-.328.625-.328.453 0 .844.281 1.25.86.313.452.64.655 1.031.655s.641-.14 1-.5c.266-.265.47-.5.657-.656"/>',
  search: '<path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"/>',
  copilot: '<path d="M7.998 15.035c-4.562 0-7.873-2.914-7.998-3.749V9.338c.085-.628.677-1.686 1.588-2.065.013-.07.024-.143.036-.218.029-.183.06-.384.126-.612-.201-.508-.254-1.084-.254-1.656 0-.87.128-1.769.693-2.484.579-.733 1.494-1.124 2.724-1.261 1.206-.134 2.262.034 2.944.765.05.053.096.108.139.165.044-.057.094-.112.143-.165.682-.731 1.738-.899 2.944-.765 1.23.137 2.145.528 2.724 1.261.566.715.693 1.614.693 2.484 0 .572-.053 1.148-.254 1.656.066.228.098.429.126.612.012.076.024.148.037.218.924.385 1.522 1.471 1.591 2.095v1.872c0 .766-3.351 3.795-8.002 3.795Zm0-1.485c2.28 0 4.584-1.11 5.002-1.433V7.862l-.023-.116c-.49.21-1.075.291-1.727.291-1.146 0-2.059-.327-2.71-.991A3.222 3.222 0 0 1 8 6.303a3.24 3.24 0 0 1-.544.743c-.65.664-1.563.991-2.71.991-.652 0-1.236-.081-1.727-.291l-.023.116v4.255c.419.323 2.722 1.433 5.002 1.433ZM6.762 2.83c-.193-.206-.637-.413-1.682-.297-1.019.113-1.479.404-1.713.7-.247.312-.369.789-.369 1.554 0 .793.129 1.171.308 1.371.162.181.519.379 1.442.379.853 0 1.339-.235 1.638-.54.315-.322.527-.827.617-1.553.117-.935-.037-1.395-.241-1.614Zm4.155-.297c-1.044-.116-1.488.091-1.681.297-.204.219-.359.679-.242 1.614.091.726.303 1.231.618 1.553.299.305.784.54 1.638.54.922 0 1.28-.198 1.442-.379.179-.2.308-.578.308-1.371 0-.765-.123-1.242-.37-1.554-.233-.296-.693-.587-1.713-.7Z"/><path d="M6.25 9.037a.75.75 0 0 1 .75.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 .75-.75Zm4.25.75v1.501a.75.75 0 0 1-1.5 0V9.787a.75.75 0 0 1 1.5 0Z"/>',
  plus: '<path d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"/>',
  'triangle-down': '<path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"/>',
  'issue-opened': '<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>',
  'git-pull-request': '<path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z"/>',
  inbox: '<path d="M2.8 2.06A1.75 1.75 0 0 1 4.41 1h7.18c.7 0 1.333.417 1.61 1.06l2.74 6.395c.04.093.06.194.06.295v4.5A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25v-4.5c0-.101.02-.202.06-.295Zm1.61.44a.25.25 0 0 0-.23.152L1.887 8H4.75a.75.75 0 0 1 .6.3L6.625 10h2.75l1.275-1.7a.75.75 0 0 1 .6-.3h2.863L11.82 2.652a.25.25 0 0 0-.23-.152Zm10.09 7h-2.875l-1.275 1.7a.75.75 0 0 1-.6.3h-3.5a.75.75 0 0 1-.6-.3L4.375 9.5H1.5v3.75c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25Z"/>',
  repo: '<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>',
  'repo-push': '<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0V1.5h-8a1 1 0 0 0-1 1v6.708A2.493 2.493 0 0 1 4.5 9h2.25a.75.75 0 0 1 0 1.5H4.5a1 1 0 0 0 0 2h4.75a.75.75 0 0 1 0 1.5H4.5A2.5 2.5 0 0 1 2 11.5Zm12.23 7.79h-.001l-1.224-1.224v6.184a.75.75 0 0 1-1.5 0V9.066L10.28 10.29a.75.75 0 0 1-1.06-1.061l2.505-2.504a.75.75 0 0 1 1.06 0L15.29 9.23a.751.751 0 0 1-.018 1.042.751.751 0 0 1-1.042.018Z"/>',
  codespaces: '<path d="M0 11.25c0-.966.784-1.75 1.75-1.75h12.5c.966 0 1.75.784 1.75 1.75v3A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm2-9.5C2 .784 2.784 0 3.75 0h8.5C13.216 0 14 .784 14 1.75v5a1.75 1.75 0 0 1-1.75 1.75h-8.5A1.75 1.75 0 0 1 2 6.75Zm1.75-.25a.25.25 0 0 0-.25.25v5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-5a.25.25 0 0 0-.25-.25Zm-2 9.5a.25.25 0 0 0-.25.25v3c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25v-3a.25.25 0 0 0-.25-.25Z"/><path d="M7 12.75a.75.75 0 0 1 .75-.75h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75Zm-4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1-.75-.75Z"/>',
  code: '<path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"/>',
  organization: '<path d="M1.75 16A1.75 1.75 0 0 1 0 14.25V1.75C0 .784.784 0 1.75 0h8.5C11.216 0 12 .784 12 1.75v12.5c0 .085-.006.168-.018.25h2.268a.25.25 0 0 0 .25-.25V8.285a.25.25 0 0 0-.111-.208l-1.055-.703a.749.749 0 1 1 .832-1.248l1.055.703c.487.325.779.871.779 1.456v5.965A1.75 1.75 0 0 1 14.25 16h-3.5a.766.766 0 0 1-.197-.026c-.099.017-.2.026-.303.026h-3a.75.75 0 0 1-.75-.75V14h-1v1.25a.75.75 0 0 1-.75.75Zm-.25-1.75c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25ZM3.75 6h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 3.75A.75.75 0 0 1 3.75 3h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 3.75Zm4 3A.75.75 0 0 1 7.75 6h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 7 6.75ZM7.75 3h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5ZM3 9.75A.75.75 0 0 1 3.75 9h.5a.75.75 0 0 1 0 1.5h-.5A.75.75 0 0 1 3 9.75ZM7.75 9h.5a.75.75 0 0 1 0 1.5h-.5a.75.75 0 0 1 0-1.5Z"/>',
  home: '<path d="M6.906.664a1.749 1.749 0 0 1 2.187 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Zm1.25 1.171a.25.25 0 0 0-.312 0l-5.25 4.2a.25.25 0 0 0-.094.196v7.019c0 .138.112.25.25.25H5.5V8.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v5.25h2.75a.25.25 0 0 0 .25-.25V6.23a.25.25 0 0 0-.094-.195Z"/>',
  table: '<path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25ZM6.5 6.5v8h7.75a.25.25 0 0 0 .25-.25V6.5Zm8-1.5V1.75a.25.25 0 0 0-.25-.25H6.5V5Zm-13 1.5v7.75c0 .138.112.25.25.25H5v-8ZM5 5V1.5H1.75a.25.25 0 0 0-.25.25V5Z"/>',
  'comment-discussion': '<path d="M1.75 1h8.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 10.25 10H7.061l-2.574 2.573A1.458 1.458 0 0 1 2 11.543V10h-.25A1.75 1.75 0 0 1 0 8.25v-5.5C0 1.784.784 1 1.75 1ZM1.5 2.75v5.5c0 .138.112.25.25.25h1a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h3.5a.25.25 0 0 0 .25-.25v-5.5a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm13 2a.25.25 0 0 0-.25-.25h-.5a.75.75 0 0 1 0-1.5h.5c.966 0 1.75.784 1.75 1.75v5.5A1.75 1.75 0 0 1 14.25 12H14v1.543a1.458 1.458 0 0 1-2.487 1.03L9.22 12.28a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l2.22 2.22v-2.19a.75.75 0 0 1 .75-.75h1a.25.25 0 0 0 .25-.25Z"/>',
  telescope: '<path d="M14.184 1.143v-.001l1.422 2.464a1.75 1.75 0 0 1-.757 2.451L3.104 11.713a1.75 1.75 0 0 1-2.275-.702l-.447-.775a1.75 1.75 0 0 1 .53-2.32L11.682.573a1.748 1.748 0 0 1 2.502.57Zm-4.709 9.32h-.001l2.644 3.863a.75.75 0 1 1-1.238.848l-1.881-2.75v2.826a.75.75 0 0 1-1.5 0v-2.826l-1.881 2.75a.75.75 0 1 1-1.238-.848l2.049-2.992a.746.746 0 0 1 .293-.253l1.809-.87a.749.749 0 0 1 .944.252ZM9.436 3.92h-.001l-4.97 3.39.942 1.63 5.42-2.61Zm3.091-2.108h.001l-1.85 1.26 1.505 2.605 2.016-.97a.247.247 0 0 0 .13-.151.247.247 0 0 0-.022-.199l-1.422-2.464a.253.253 0 0 0-.161-.119.254.254 0 0 0-.197.038ZM1.756 9.157a.25.25 0 0 0-.075.33l.447.775a.25.25 0 0 0 .325.1l1.598-.769-.83-1.436-1.465 1Z"/>',
  gift: '<path d="M2 2.75A2.75 2.75 0 0 1 4.75 0c.983 0 1.873.42 2.57 1.232.268.318.497.668.68 1.042.183-.375.411-.725.68-1.044C9.376.42 10.266 0 11.25 0a2.75 2.75 0 0 1 2.45 4h.55c.966 0 1.75.784 1.75 1.75v2c0 .698-.409 1.301-1 1.582v4.918A1.75 1.75 0 0 1 13.25 16H2.75A1.75 1.75 0 0 1 1 14.25V9.332C.409 9.05 0 8.448 0 7.75v-2C0 4.784.784 4 1.75 4h.55c-.192-.375-.3-.8-.3-1.25ZM7.25 9.5H2.5v4.75c0 .138.112.25.25.25h4.5Zm1.5 0v5h4.5a.25.25 0 0 0 .25-.25V9.5Zm0-4V8h5.5a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25Zm-7 0a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25h5.5V5.5h-5.5Zm3-4a1.25 1.25 0 0 0 0 2.5h2.309c-.233-.818-.542-1.401-.878-1.793-.43-.502-.915-.707-1.431-.707ZM8.941 4h2.309a1.25 1.25 0 0 0 0-2.5c-.516 0-1 .205-1.43.707-.337.392-.646.975-.879 1.793Z"/>',
  smiley: '<path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Zm3.82 1.636a.75.75 0 0 1 1.038.175l.007.009c.103.118.22.222.35.31.264.178.683.37 1.285.37.602 0 1.02-.192 1.285-.371.13-.088.247-.192.35-.31l.007-.008a.75.75 0 0 1 1.222.87l-.022-.015c.02.013.021.015.021.015v.001l-.001.002-.002.003-.005.007-.014.019a2.066 2.066 0 0 1-.184.213c-.16.166-.338.316-.53.445-.63.418-1.37.638-2.127.629-.946 0-1.652-.308-2.126-.63a3.331 3.331 0 0 1-.715-.657l-.014-.02-.005-.006-.002-.003v-.002h-.001l.613-.432-.614.43a.75.75 0 0 1 .183-1.044ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM5 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm5.25 2.25.592.416a97.71 97.71 0 0 0-.592-.416Z"/>',
  person: '<path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"/>',
  star: '<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"/>',
  'code-square': '<path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm7.47 3.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L10.69 8 9.22 6.53a.75.75 0 0 1 0-1.06ZM6.78 6.53 5.31 8l1.47 1.47a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-2-2a.75.75 0 0 1 0-1.06l2-2a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"/>',
  gear: '<path d="M8 0a8.2 8.2 0 0 1 .701.031C9.444.095 9.99.645 10.16 1.29l.288 1.107c.018.066.079.158.212.224.231.114.454.243.668.386.123.082.233.09.299.071l1.103-.303c.644-.176 1.392.021 1.82.63.27.385.506.792.704 1.218.315.675.111 1.422-.364 1.891l-.814.806c-.049.048-.098.147-.088.294.016.257.016.515 0 .772-.01.147.038.246.088.294l.814.806c.475.469.679 1.216.364 1.891a7.977 7.977 0 0 1-.704 1.217c-.428.61-1.176.807-1.82.63l-1.102-.302c-.067-.019-.177-.011-.3.071a5.909 5.909 0 0 1-.668.386c-.133.066-.194.158-.211.224l-.29 1.106c-.168.646-.715 1.196-1.458 1.26a8.006 8.006 0 0 1-1.402 0c-.743-.064-1.289-.614-1.458-1.26l-.289-1.106c-.018-.066-.079-.158-.212-.224a5.738 5.738 0 0 1-.668-.386c-.123-.082-.233-.09-.299-.071l-1.103.303c-.644.176-1.392-.021-1.82-.63a8.12 8.12 0 0 1-.704-1.218c-.315-.675-.111-1.422.363-1.891l.815-.806c.05-.048.098-.147.088-.294a6.214 6.214 0 0 1 0-.772c.01-.147-.038-.246-.088-.294l-.815-.806C.635 6.045.431 5.298.746 4.623a7.92 7.92 0 0 1 .704-1.217c.428-.61 1.176-.807 1.82-.63l1.102.302c.067.019.177.011.3-.071.214-.143.437-.272.668-.386.133-.066.194-.158.211-.224l.29-1.106C6.009.645 6.556.095 7.299.03 7.53.01 7.764 0 8 0Zm-.571 1.525c-.036.003-.108.036-.137.146l-.289 1.105c-.147.561-.549.967-.998 1.189-.173.086-.34.183-.5.29-.417.278-.97.423-1.529.27l-1.103-.303c-.109-.03-.175.016-.195.045-.22.312-.412.644-.573.99-.014.031-.021.11.059.19l.815.806c.411.406.562.957.53 1.456a4.709 4.709 0 0 0 0 .582c.032.499-.119 1.05-.53 1.456l-.815.806c-.081.08-.073.159-.059.19.162.346.353.677.573.989.02.03.085.076.195.046l1.102-.303c.56-.153 1.113-.008 1.53.27.161.107.328.204.501.29.447.222.85.629.997 1.189l.289 1.105c.029.109.101.143.137.146a6.6 6.6 0 0 0 1.142 0c.036-.003.108-.036.137-.146l.289-1.105c.147-.561.549-.967.998-1.189.173-.086.34-.183.5-.29.417-.278.97-.423 1.529-.27l1.103.303c.109.029.175-.016.195-.045.22-.313.411-.644.573-.99.014-.031.021-.11-.059-.19l-.815-.806c-.411-.406-.562-.957-.53-1.456a4.709 4.709 0 0 0 0-.582c-.032-.499.119-1.05.53-1.456l.815-.806c.081-.08.073-.159.059-.19a6.464 6.464 0 0 0-.573-.989c-.02-.03-.085-.076-.195-.046l-1.102.303c-.56.153-1.113.008-1.53-.27a4.44 4.44 0 0 0-.501-.29c-.447-.222-.85-.629-.997-1.189l-.289-1.105c-.029-.11-.101-.143-.137-.146a6.6 6.6 0 0 0-1.142 0ZM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9.5 8a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9.5 8Z"/>',
  'sign-out': '<path d="M2 2.75C2 1.784 2.784 1 3.75 1h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h2.5a.75.75 0 0 1 0 1.5h-2.5A1.75 1.75 0 0 1 2 13.25Zm10.44 4.5-1.97-1.97a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215l3.25 3.25a.75.75 0 0 1 0 1.06l-3.25 3.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734l1.97-1.97H6.75a.75.75 0 0 1 0-1.5Z"/>',
  x: '<path d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"/>',
};
const oc = (n, s = 16) => `<svg class="oc" width="${s}" height="${s}" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">${P[n]}</svg>`;
const AVATAR = '<img src="assets/portraits/men-26.jpg" alt="" width="32" height="32" draggable="false">';
const item = (icon, label, extra = '') => `<li role="none"><button class="ai${extra}" type="button" role="menuitem" tabindex="-1">${icon ? `<span class="lv">${oc(icon)}</span>` : ''}<span class="tx">${label}</span></button></li>`;
const div = '<li class="dv" role="separator"></li>';

export default {
  id: 'mn-github-topbar',
  credit: 'GitHub.com global header (2024+ AppHeader) with Primer ActionMenu overlays and Octicons',
  size: 'full',
  css: `
    :host { display: block; position: relative; }
    :host([data-open]) { z-index: 30; }
    .bar {
      --fg: #1f2328; --muted: #59636e; --border: #d1d9e0; --hover: #818b981a; --active: #818b9826; --accent: #0969da;
      --ease: cubic-bezier(0.33, 1, 0.68, 1);
      position: relative; container-type: inline-size;
      background: #f6f8fa; border: 1px solid var(--border); border-radius: 12px; color: var(--fg);
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
    }
    .row { display: flex; align-items: center; gap: 8px; height: 64px; padding: 16px; }
    .left, .right { display: flex; align-items: center; gap: 8px; min-width: 0; }
    .left { flex: 1 1 auto; }
    .right { flex: 0 0 auto; }
    .anc { position: relative; display: flex; }
    .ib {
      position: relative; display: inline-flex; align-items: center; justify-content: center; flex: none;
      width: 32px; height: 32px; padding: 0; margin: 0; border: 1px solid var(--border); border-radius: 6px;
      background: transparent; color: var(--muted); cursor: pointer;
      transition: background-color 80ms var(--ease), color 80ms var(--ease);
    }
    .ib:hover { background: var(--hover); color: var(--fg); }
    .ib:active, .ib[aria-expanded="true"] { background: var(--active); color: var(--fg); }
    .ib.wide { width: auto; padding: 0 6px; gap: 2px; }
    .ib.wide .oc + .oc { margin-left: 0; }
    button:focus { outline: none; }
    .ib:focus-visible, .ctx a:focus-visible, .logo:focus-visible, .sb:focus-visible, .av:focus-visible, .ai:focus-visible, .x:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
    .av:focus-visible { outline-offset: 2px; }
    .logo { display: inline-flex; color: var(--fg); border-radius: 6px; flex: none; }
    .ctx { display: flex; align-items: center; min-width: 0; white-space: nowrap; }
    .ctx a { color: var(--fg); text-decoration: none; padding: 3px 6px; border-radius: 6px; line-height: 20px; overflow: hidden; text-overflow: ellipsis; transition: background-color 80ms var(--ease); }
    .ctx a:hover { background: var(--hover); }
    .ctx a.cur { font-weight: 600; }
    .ctx .sep { color: var(--muted); padding: 0 1px; }
    .sb {
      display: flex; align-items: center; gap: 8px; width: 320px; height: 32px; padding: 0 8px;
      border: 1px solid var(--border); border-radius: 6px; background: transparent; color: var(--muted);
      font: inherit; cursor: text; text-align: left; white-space: nowrap; transition: background-color 80ms var(--ease);
    }
    .sb:hover { background: var(--hover); }
    .sb .tx { flex: 1; }
    kbd { display: inline-block; padding: 0 4px; margin: 0 1px; font: 11px/16px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; color: var(--muted); border: 1px solid var(--border); border-radius: 4px; box-shadow: inset 0 -1px 0 #d1d9e0b3; vertical-align: 1px; }
    .dvd { width: 1px; height: 20px; background: var(--border); flex: none; margin: 0 4px; }
    .dot { position: absolute; top: -3px; right: -3px; width: 10px; height: 10px; border-radius: 50%; background: var(--accent); border: 2px solid #f6f8fa; }
    .av { width: 32px; height: 32px; padding: 0; border: 0; border-radius: 50%; overflow: hidden; cursor: pointer; background: #f0f0f0; box-shadow: 0 0 0 1px #1f23281a; flex: none; }
    .av img { display: block; width: 100%; height: 100%; object-fit: cover; }
    .oc { display: block; flex: none; }
    .sbi { display: none; }

    /* Primer ActionMenu overlay */
    .ov {
      position: absolute; top: calc(100% + 4px); z-index: 5; min-width: 192px; max-width: 320px;
      background: #fff; border-radius: 12px; padding: 8px 0;
      box-shadow: 0 0 0 1px #d1d9e080, 0 6px 12px -3px #25292e0a, 0 6px 18px 0 #25292e1f;
      visibility: hidden; opacity: 0; transition: opacity 200ms var(--ease), visibility 0s 200ms;
    }
    .ov.on { visibility: visible; opacity: 1; transition: opacity 200ms var(--ease), visibility 0s; }
    .ov.r { right: 0; } .ov.l { left: 0; }
    .ov ul { list-style: none; margin: 0; padding: 0; }
    .ai {
      display: flex; align-items: center; gap: 8px; width: calc(100% - 16px); min-height: 32px; margin: 0 8px; padding: 6px 8px;
      border: 0; border-radius: 6px; background: transparent; color: var(--fg); font: inherit; line-height: 20px;
      text-align: left; cursor: pointer; white-space: nowrap; transition: background-color 80ms var(--ease);
    }
    .ai:hover, .ai:focus-visible { background: var(--hover); }
    .ai:active { background: var(--active); }
    .ai .lv { display: flex; color: var(--muted); }
    .ai.danger { color: #d1242f; } .ai.danger .lv { color: #d1242f; }
    .dv { height: 1px; margin: 7px 0 8px; background: #d1d9e0b3; }
    .uh { display: flex; align-items: center; gap: 8px; padding: 6px 16px 10px; }
    .uh .av { cursor: default; }
    .uh b { display: block; font-weight: 600; line-height: 20px; }
    .uh span { display: block; color: var(--muted); font-size: 12px; line-height: 16px; }
    .navh { display: flex; align-items: center; justify-content: space-between; padding: 0 8px 8px 16px; color: var(--fg); }
    .x { width: 32px; height: 32px; border: 0; border-radius: 6px; background: transparent; color: var(--muted); display: grid; place-items: center; cursor: pointer; }
    .x:hover { background: var(--hover); color: var(--fg); }
    .ov-nav { width: 280px; }
    .ov-user { width: 260px; }
    /* search overlay */
    .ov-search { top: 15px; min-width: 0; max-width: none; padding: 0; border-radius: 12px; overflow: hidden; }
    .qi { display: flex; align-items: center; gap: 8px; height: 40px; padding: 0 8px 0 12px; border-bottom: 1px solid #d1d9e0b3; color: var(--muted); }
    .qi input { flex: 1; min-width: 0; border: 0; outline: 0; background: none; font: inherit; color: var(--fg); }
    .qi input::placeholder { color: var(--muted); }
    .qi:focus-within { box-shadow: inset 0 0 0 2px var(--accent); border-radius: 12px 12px 0 0; }
    .ov-search ul { padding: 8px 0; }
    .ov-search .ai .sub { margin-left: auto; color: var(--muted); font-size: 12px; padding-left: 16px; }
    .qf { padding: 8px 16px; border-top: 1px solid #d1d9e0b3; background: #f6f8fa; font-size: 12px; }
    .qf a { color: var(--accent); text-decoration: none; }
    .qf a:hover { text-decoration: underline; }

    @container (width < 1012px) {
      .sb { width: 32px; padding: 0; justify-content: center; }
      .sb .tx { display: none; }
    }
    @container (width < 768px) {
      .hide-md { display: none; }
    }
    @container (width < 544px) {
      .hide-sm { display: none; }
      .row { gap: 6px; padding: 16px 12px; }
      .left, .right { gap: 6px; }
    }
    @container (width < 400px) {
      .hide-xs { display: none; }
    }
  `,
  html: `
    <header class="bar">
      <div class="row">
        <div class="left">
          <div class="anc">
            <button class="ib" type="button" data-ov="nav" aria-label="Open global navigation menu" aria-haspopup="true" aria-expanded="false">${oc('three-bars')}</button>
            <div class="ov ov-nav l" data-ov="nav" role="dialog" aria-label="Global navigation">
              <div class="navh">${oc('mark-github', 32)}<button class="x" type="button" aria-label="Close">${oc('x')}</button></div>
              <ul role="menu">${item('home', 'Home')}${item('issue-opened', 'Issues')}${item('git-pull-request', 'Pull requests')}${item('table', 'Projects')}${item('comment-discussion', 'Discussions')}${item('codespaces', 'Codespaces')}${item('copilot', 'Copilot')}${div}${item('telescope', 'Explore')}${item('gift', 'Marketplace')}</ul>
            </div>
          </div>
          <a class="logo" href="#" aria-label="Homepage">${oc('mark-github', 32)}</a>
          <nav class="ctx" aria-label="Page context"><a class="hide-sm" href="#">alantai</a><span class="sep hide-sm">/</span><a class="cur" href="#">buttons</a></nav>
        </div>
        <div class="right">
          <button class="sb" type="button" data-ov="search" aria-label="Search or jump to…" aria-expanded="false">${oc('search')}<span class="tx">Type <kbd>/</kbd> to search</span></button>
          <span class="dvd hide-md"></span>
          <button class="ib hide-md" type="button" aria-label="Chat with Copilot">${oc('copilot')}</button>
          <span class="dvd hide-md"></span>
          <div class="anc hide-sm">
            <button class="ib wide" type="button" data-ov="plus" aria-label="Create something new" aria-haspopup="true" aria-expanded="false">${oc('plus')}${oc('triangle-down')}</button>
            <div class="ov r" data-ov="plus" role="menu">
              <ul>${item('repo', 'New repository')}${item('repo-push', 'Import repository')}${div}${item('codespaces', 'New codespace')}${item('code', 'New gist')}${div}${item('organization', 'New organization')}</ul>
            </div>
          </div>
          <button class="ib hide-md" type="button" aria-label="Your issues">${oc('issue-opened')}</button>
          <button class="ib hide-md" type="button" aria-label="Your pull requests">${oc('git-pull-request')}</button>
          <button class="ib hide-xs" type="button" aria-label="You have unread notifications">${oc('inbox')}<span class="dot"></span></button>
          <div class="anc">
            <button class="av" type="button" data-ov="user" aria-label="Open user navigation menu" aria-haspopup="true" aria-expanded="false">${AVATAR}</button>
            <div class="ov ov-user r" data-ov="user" role="dialog" aria-label="User navigation">
              <div class="uh"><span class="av">${AVATAR}</span><div><b>alantai</b><span>Alan Tai</span></div></div>
              <ul role="menu">${item('smiley', 'Set status')}${div}${item('person', 'Your profile')}${item('repo', 'Your repositories')}${item('copilot', 'Your Copilot')}${item('table', 'Your projects')}${item('star', 'Your stars')}${item('code-square', 'Your gists')}${item('organization', 'Your organizations')}${div}${item('gear', 'Settings')}${div}${item('sign-out', 'Sign out')}</ul>
            </div>
          </div>
        </div>
      </div>
      <div class="ov ov-search" data-ov="search" role="dialog" aria-label="Search">
        <label class="qi">${oc('search')}<input type="text" placeholder="Search or jump to..." aria-label="Search or jump to"><button class="x" type="button" aria-label="Close search">${oc('x')}</button></label>
        <ul role="menu">${item('repo', 'alantai/buttons')}${item('repo', 'primer/octicons')}${item('repo', 'primer/react')}${item('search', 'Search all of GitHub', '')}</ul>
        <div class="qf"><a href="#">Search syntax tips</a></div>
      </div>
    </header>`,
  init(root, host) {
    const bar = root.querySelector('.bar');
    const trig = Object.fromEntries([...root.querySelectorAll('button[data-ov]')].map((b) => [b.dataset.ov, b]));
    const ovs = Object.fromEntries([...root.querySelectorAll('div[data-ov]')].map((o) => [o.dataset.ov, o]));
    let cur = null;
    const onDoc = (e) => { if (!e.composedPath().includes(host)) set(null); };
    const items = () => (cur ? [...ovs[cur].querySelectorAll('.ai')].filter((b) => b.offsetParent) : []);
    const onKey = (e) => {
      if (!cur) return;
      if (e.key === 'Escape') { const t = trig[cur]; set(null); t.focus({ preventScroll: true }); return; }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const list = items(); if (!list.length) return; e.preventDefault();
        const i = list.indexOf(root.activeElement);
        list[(i + (e.key === 'ArrowDown' ? 1 : -1) + list.length) % list.length].focus({ preventScroll: true });
      }
    };
    const set = (k) => {
      if (cur) { ovs[cur].classList.remove('on'); trig[cur].setAttribute('aria-expanded', 'false'); }
      cur = k;
      if (k) {
        const o = ovs[k];
        if (k === 'search') {
          const br = bar.getBoundingClientRect(), sr = trig.search.getBoundingClientRect();
          const w = Math.min(560, br.width - 24);
          const right = Math.max(11, Math.min(br.right - sr.right - 1, br.width - w - 12));
          o.style.right = right + 'px'; o.style.width = w + 'px';
        }
        o.classList.add('on'); trig[k].setAttribute('aria-expanded', 'true');
        if (k === 'search') o.querySelector('input').focus({ preventScroll: true });
      }
      host.toggleAttribute('data-open', !!k);
      document.removeEventListener('pointerdown', onDoc, true);
      if (k) document.addEventListener('pointerdown', onDoc, true);
    };
    Object.entries(trig).forEach(([k, b]) => b.addEventListener('click', () => set(cur === k ? null : k)));
    root.querySelectorAll('.x').forEach((x) => x.addEventListener('click', () => { const t = cur && trig[cur]; set(null); t && t.focus({ preventScroll: true }); }));
    root.querySelectorAll('.ai').forEach((b) => b.addEventListener('click', () => set(null)));
    root.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener('click', (e) => e.preventDefault()));
    root.addEventListener('keydown', onKey);
    const onSlash = (e) => { if (e.key === '/' && !cur && host.matches(':hover')) { e.preventDefault(); set('search'); } };
    document.addEventListener('keydown', onSlash);
    return () => { set(null); document.removeEventListener('keydown', onSlash); };
  },
};
