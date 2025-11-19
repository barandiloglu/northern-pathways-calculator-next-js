import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function createAdmin() {
  const email = "burcu@northernpathways.ca"
  const password = "Toronto2911!"
  const name = "Burcu"

  try {
    // Check if admin already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log(`User with email ${email} already exists. Updating to admin...`)
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
      
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: UserRole.ADMIN,
          name: name,
        },
      })
      
      console.log("Admin user updated successfully:", {
        id: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      })
    } else {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10)
      
      // Create new admin user
      const admin = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: name,
          role: UserRole.ADMIN,
          emailVerified: true,
        },
      })
      
      console.log("Admin user created successfully:", {
        id: admin.id,
        email: admin.email,
        role: admin.role,
      })
    }
  } catch (error) {
    console.error("Error creating admin user:", error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

createAdmin()

