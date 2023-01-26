export function signInForm(actionUri: string, signInFailed?: boolean) {
  return `<form action="${actionUri}" method="post">
<h1>Sign in</h1>
<input name="username" type="text" placeholder="Username"><br>
<input name="password" type="password" placeholder="Password"><br>
<input type="submit" value="Sign in">
${signInFailed ? '<p>Wrong username or password</p>' : ''}
</form>`
}
