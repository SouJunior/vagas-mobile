//REACT
import {
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native'
import { useState } from 'react'
//STYLES
import {
  SignInContainer,
  Title,
  TitleBold,
  TermsAcept,
  TermsText,
  TermsLine,
  Line1,
  LinesContainer,
  TextOU
} from './styles'
import { useTheme } from 'styled-components'
//COMPONENTS
import { ControlledInput } from '../../components/ControlInput'
//HOOK FORM
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Buttons } from '../../components/Button'
//EXPO
import Checkbox from 'expo-checkbox'
//ICONS
import { Fontisto } from '@expo/vector-icons'
import { User, Lock } from 'phosphor-react-native'
//NAVIGATION
import { useNavigation } from '@react-navigation/native'

export interface IFormInputs {
  user: string
  password: string
  terms: string
}

const schema = yup
  .object({
    user: yup
      .string()
      .email('Este e-mail esta correto?')
      .required('Campo Obrigatório'),
    password: yup
      .string()
      .min(6, 'Não esta faltando alguma coisa?')
      .required('Campo Obrigatório')
  })
  .required()

export function SignIn() {
  const [isChecked, setChecked] = useState(false)
  const { COLORS } = useTheme()
  const { navigate } = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormInputs>()
  const onSubmit = (data: IFormInputs) => console.log(data)
  function handleCheckBox() {
    setChecked(!isChecked)
  }
  function handleLogin() {
    navigate('Home')
  }
  function handleSignUp() {
    navigate('SignUp')
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SignInContainer>
        <Title>
          Sou <TitleBold>Junior</TitleBold>
        </Title>
        <Title type="subtitle">Entrar</Title>

        <ControlledInput
          control={control}
          name="user"
          placeholder="User"
          keyboardType="email-address"
          icon="user"
        />

        <ControlledInput
          control={control}
          name="password"
          placeholder="Password"
          icon="lock"
          secureTextEntry
          autoCorrect={false}
          clearTextOnFocus
        />

        <TermsAcept onPress={handleCheckBox}>
          <Controller
            name="terms"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                style={styles.checkbox}
                value={!!value}
                onValueChange={onChange}
                color={COLORS.PRIMARY_900}
              />
            )}
          />

          <TermsText>
            Li e aceito os
            <TermsLine> termos </TermsLine>e
            <TermsLine> políticas de privacidade </TermsLine>
          </TermsText>
        </TermsAcept>

        <Buttons
          onPress={handleSubmit(onSubmit)}
          type="signin"
          title="Entrar"
        />

        <LinesContainer>
          <Line1 />
          <TextOU>OU</TextOU>
          <Line1 />
        </LinesContainer>

        <Buttons
          onPress={handleSubmit(onSubmit)}
          type="linkedin"
          title="Entrar com Linkedin"
          iconLeft={
            <Fontisto name="linkedin" size={24} color={COLORS.PRIMARY_900} />
          }
        />

        <Pressable onPress={handleSignUp}>
          <Title type="signup">Criar conta</Title>
        </Pressable>
      </SignInContainer>
    </TouchableWithoutFeedback>
  )
}

export const styles = StyleSheet.create({
  checkbox: {
    marginRight: 8
  }
})
