module.exports = {
    "extends": [
        "eslint:recommended",
        "next/core-web-vitals"
    ],
    "plugins": [
        "@stylistic"
    ],
    "rules": {
        /**
         Устанавливаю 4 пробела во всех файлах по умолчанию
         https://eslint.style/rules/default/indent
        */
        "@stylistic/indent": [
            "error",
            4
        ],
        /**
         Устанавливаю необязательность точки с запятой,
         но не считаю это грубой ошибкой
         https://eslint.style/rules/default/semi
        */
        "@stylistic/semi": [
            "warn",
            "never"
        ],
        "no-unused-vars": [
            "off"
        ]
    }
}