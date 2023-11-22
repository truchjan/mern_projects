const exampleUsers = [
  {
    email: 'marek@seznam.cz',
    password: 'marekmarek'
  },
  {
    email: 'vilem@seznam.cz',
    password: 'vilemvilem'
  },
  {
    email: 'elias@seznam.cz',
    password: 'eliaselias'
  },
  {
    email: 'karel@seznam.cz',
    password: 'karelkarel'
  },
  {
    email: 'josef@seznam.cz',
    password: 'josefjosef'
  }
]

export const getRandomUser = () => {
  const i = Math.floor(Math.random() * 5)
  return exampleUsers[i]
}