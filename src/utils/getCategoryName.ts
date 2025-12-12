export default function (category: string) {
  return category.split('.').slice(-1)[0];
}
