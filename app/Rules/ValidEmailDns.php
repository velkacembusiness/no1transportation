<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Support\Str;
use Propaganistas\LaravelDisposableEmail\DisposableDomains;

class ValidEmailDns implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        // 1️⃣ Vérification syntaxe RFC
        if (!filter_var($value, FILTER_VALIDATE_EMAIL)) {
            $fail("Invalid email address");
            return;
        }

        // 3️⃣ Extraction du domaine
        $domain = Str::lower(Str::after($value, '@'));

        // 4️⃣ Vérification DNS (MX ou A)
        if (
            !checkdnsrr($domain, 'MX') &&
            !checkdnsrr($domain, 'A')
        ) {
            $fail("The email address domain does not exist or does not receive emails.");
        }
    }
}
