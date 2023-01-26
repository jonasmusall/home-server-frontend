export function singOutForm(actionUri: string) {
  return `<form id="sign-out-form" action="${actionUri}" method="post">
<input type="submit" value="Sign out">
</form>`;
}
